import React, { useState, useEffect } from "react";
import Avt from "../assets/images/products/product-01 (1).jpg";

import "../pages/custom.css";

import Helmet from "../components/Helmet";
import { auth, fs } from "../firebaseConfig";
// import { ProductsData } from "../pages/ProductsData";
// import ProductBillData from "./ProductBillData"
import CartProductsInBill from "./CartProductsInBill"

function ViewBill() {
  // gettin current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();
  console.log(uid);

  // get username
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const username = GetCurrentUser();
  console.log(username);


    // get phone in colection info bill

    var currentdate = new Date();
    var datetime = "" + currentdate.getDay() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getFullYear() + " - " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    // console.log(datetime)
  function GetCurrentData() {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [dc, setDC] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const collection = fs.collection(
            "Info bill of " + username + " " + uid
          );
          // console.log(collection);
          collection.get().then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
                setName(data.Name);
                setEmail(data.Email)
                setPhone(data.Phone)
                setDC(data.ResidentialAddress)
            });
          });
        } else {
          console.log("user is not");
        }
      });
    }, );
    return [name, email, phone, dc];
  }
  const data = GetCurrentData();
  // console.log(data);



const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Detail bill of " + username + " " + uid).onSnapshot(
          (snapshot) => {
            const newCartProduct = snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setCartProducts(newCartProduct);
          }
        );
        // console.log(cartProducts);
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, [username]);

  // console.log(cartProducts);

  // getting the qty from cartProducts in a seperate array
  // const qty = cartProducts.map((cartProduct) => {
  //   return cartProduct.qty;
  // });



  return (
    <Helmet title="Hóa đơn">
      <div className="ViewBill">
        <div className="view__info">
          <div className="info__top">
            <div className="view__info__avt">
              <img src={Avt} alt="" />
            </div>
            <div className="view__info__title">
              {username} <i class="bx bx-edit-alt"></i>
            </div>
          </div>
          <div className="view__info__catalog">
            <ul>
              <li>
                <i class="bx bxs-user"></i>
                <span>Tài khoản của tôi</span>
              </li>
              <li>
                <i class="bx bxs-notepad"></i>
                <span>Đơn mua</span>
              </li>
              <li>
                <i class="bx bxs-bell-ring"></i>
                <span>Thông báo</span>
              </li>
              <li>
                <i class="bx bxs-food-menu"></i>
                <span>Voucher</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="view__status">
          <div className="view__status__top">
            <ul>
              <li className="active">
                <span>Chờ duyệt</span>
              </li>
              <li>
                <span>Đang giao</span>
              </li>
              <li>
                <span>Đã giao</span>
              </li>
              <li>
                <span>Đã hủy</span>
              </li>
            </ul>
          </div>
          <div className="view__status__list">
            <div className="title__bill">
              <p>
                Mã đơn hàng: <span>{uid}</span>{" "}
              </p>
              <p>Thời gian : {datetime}</p>
            </div>
            <div className="info__bill">
              <div className="info__customer">
                <h1>Thông tin khách hàng</h1>
                <div className="item">
                  Tên: {data[0]}
                </div>
                <div className="item">Email : {data[1]}</div>
                <div className="item">SĐT: {data[2]}</div>
                <div className="item">Địa chỉ : {data[3]}</div>
              </div>
              <div className="info__detailBill">
                <h1>Thông tin sản phẩm</h1>
              {
                cartProducts.length > 0 && (
                <CartProductsInBill
                  cartProducts={cartProducts}
                  
                />
                  // console.log("sản phẩm")
                )
              }
              {
                cartProducts.length <1 && (
                  
                  <span>Chưa có sản phẩm</span>
                )
              }
              </div>
              <div className="total__price">
                <h1>Thanh toán</h1>
                <div className="price_bill">Tổng giá trị đơn: {}</div>
                <div className="price_bill">Giảm giá</div>

                <div className="price_bill">Phí giao hàng</div>
                <div className="price_bill">Thanh toán</div>
                <br />
                <div className="price_bill">Tổng thanh toán</div>
              </div>
            </div>
            <div className="btn-end">
              <button>Hủy đơn hàng</button>
              <button>Quay lại trang chủ</button>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default ViewBill;
