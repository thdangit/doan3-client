import React, { useState, useEffect } from "react";
import Avt from "../assets/images/products/product-01 (1).jpg";

import "../pages/custom.css";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
import { auth, fs } from "../firebaseConfig";
import BillProducts from "./viewBill/BillProduct";

function ViewBill({ TotalPrice, totalQty, props }) {
  // const [cartQty] = useState(totalQty);
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

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [sdt, setSDT] = useState(null);
    const [dc, setDC] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName, user);
              setEmail(snapshot.data().Email);
              setSDT(snapshot.data().sdt);
              setDC(snapshot.data().diachi);
            });
        } else {
          setUser(null);
          setEmail(null);
          setSDT(null);
          setDC(null);
        }
      });
    }, []);
    return [user, email, sdt, dc];
  }

  const infor = GetCurrentUser();
  // console.log(infor);

  const [item, setItem] = useState([]);
  const [tt, setTT] = useState("");

  // getting products function
  const getTT = async () => {
    const item = await fs.collection("Bill").get();
    // const itemArray = [];
    for (var snap of item.docs) {
      var data = snap.data();
      // const trangthai = data.find((item) => data.id === uid);
      if ((data.id = uid)) {
        const trangthai = data.trangthai;
        setTT(trangthai);
        console.log(data.trangthai);
      }
      // console.log(trangthai);
      console.log(uid);
      console.log(data.id);
      // itemArray.push({
      //   ...data,
      // });
      // if (itemArray.length === item.docs.length) {
      //   setItem(itemArray);
      // }

      // setTT(trangthai);
    }
    // const trangthai = data.trangthai;
  };

  useEffect(() => {
    getTT();
  }, [uid]);
  // get username
  // function GetData(id) {
  //   const [user, setUser] = useState(null);
  //   useEffect(() => {
  //     auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         fs.collection("Bill").doc(id).get().then(console.log(id));
  //       } else {
  //         setUser(null);
  //       }
  //     });
  //   }, []);
  //   return user;
  // }

  // const username = GetData();
  // console.log(username);

  // var docRef = fs.collection("Bill");

  // docRef
  //   .get()
  //   .then((doc) => {
  //     if (doc.exists) {
  //       console.log("Document data:", doc.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   })
  // .catch((error) => {
  //   console.log("Error getting document:", error);
  // });
  // const GetID = async (id) => {
  //   const doc = await fs.collection("Bill").doc(uid).get();
  //   console.log(doc);
  // };
  // const test = GetID();
  // console.log(test);

  // get phone in colection info bill

  var currentdate = new Date();
  var datetime =
    "" +
    currentdate.getDay() +
    "/" +
    currentdate.getMonth() +
    "/" +
    currentdate.getFullYear();

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const newCartProduct = snapshot.data().cart;
            setCartProducts(newCartProduct);
          });
        console.log(cartProducts.id);
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  const price = cartProducts.map((cartProduct) => {
    return Number(cartProduct.gia);
  }, []);

  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);
  console.log(totalPrice);

  // const [cartPrice] = useState(TotalPrice);
  // console.log(cartPrice);

  return (
    <Helmet title="H??a ????n">
      <div className="ViewBill">
        <div className="view__info">
          <div className="info__top">
            <div className="view__info__avt">
              <img src={Avt} alt="" />
            </div>
            <div className="view__info__title">
              {infor[0]} <i class="bx bx-edit-alt"></i>
            </div>
          </div>
          <div className="view__info__catalog">
            <ul>
              <li>
                <i class="bx bxs-user"></i>
                <span>T??i kho???n c???a t??i</span>
              </li>
              <li>
                <i class="bx bxs-notepad"></i>
                <span>????n mua</span>
              </li>
              <li>
                <i class="bx bxs-bell-ring"></i>
                <span>Th??ng b??o</span>
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
                <span>{tt}</span>
              </li>
              {/* <li>
                <span>??ang giao</span>
              </li>
              <li>
                <span>???? giao</span>
              </li>
              <li>
                <span>???? h???y</span>
              </li> */}
            </ul>
          </div>
          <div className="view__status__list">
            <div className="title__bill">
              <p>
                M?? ????n h??ng: <span>{uid}</span>{" "}
              </p>
              <p>Th???i gian : {datetime}</p>
            </div>
            <div className="info__bill">
              <div className="info__customer">
                <h1>Th??ng tin kh??ch h??ng</h1>
                <div className="item">T??n: {infor[0]}</div>
                <div className="item">Email: {infor[1]}: </div>
                <div className="item">S??T: {infor[2]} </div>
                <div className="item">?????a ch??? : {infor[3]}</div>
              </div>
              <div className="info__detailBill">
                <h1>Th??ng tin s???n ph???m</h1>
                <BillProducts cartProducts={cartProducts} />
              </div>
              <div className="total__price">
                <h1>Thanh to??n</h1>
                <div className="price_bill">T???ng gi?? tr??? ????n: {totalPrice}</div>
                <div className="price_bill">Gi???m gi??: {0}</div>

                <div className="price_bill">Ph?? giao h??ng: Free</div>
                <div className="price_bill">Thanh to??n: {totalPrice}</div>
                <br />
                <div className="price_bill">T???ng thanh to??n: {totalPrice}</div>
              </div>
            </div>
            <div className="btn-end">
              <button>H???y ????n h??ng</button>
              <Link to="/">
                <button>Quay l???i trang ch???</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default ViewBill;
