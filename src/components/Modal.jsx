import React, { useState, useEffect } from "react";
import { auth, fs } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase";

import "../pages/custom.css";

toast.configure();

const Modal = ({ TotalPrice, totalQty, hideModal }) => {
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

  const history = useHistory();

  // form states
  const [cell, setCell] = useState(null);
  const [trangthai] = useState("Đang giao hàng");
  const [cartPrice] = useState(TotalPrice);
  const [cartQty] = useState(totalQty);

  // close modal
  const handleCloseModal = () => {
    hideModal();
  };

  const [bill, setBill] = useState({
    name: "",
    phone: "",
    datetime: "",
    dc: "",
    CartPrice: cartPrice,
    CartQty: cartQty,
    trangthai: trangthai,
  });
  const onChange = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value,
    });
  };

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
        console.log(cartProducts);
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  console.log(cartProducts);

  // cash on delivery
  const handleCashOnDelivery = async (e) => {
    e.preventDefault();

    fs.collection("Bill")
      .add({
        ...bill,
        id: uid,
        datetime: new Date(bill.datetime),
        product: firebase.firestore.FieldValue.arrayUnion(...cartProducts),
      })
      .then(function (doc) {
        const IDDoc = doc.id;
        console.log(IDDoc);
        hideModal();
        history.push("/cart");
        toast.success("Đặt hàng thành công!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });

        // fs.collection("Cart").doc(uid).delete();
      })
      .catch(function (err) {
        console.error(err);
      });

    // fs.collection("Bill")
    //   .doc()
    //   .update({
    //     product: firebase.firestore.FieldValue.arrayUnion(...cartProducts),
    //   });
    // fs.collection("Cart").doc(uid).delete();
    // console.log(cell, residentialAddress, cartPrice, cartQty);

    // const uid = auth.currentUser.uid;
    // const userData = await fs.collection("users").doc(uid).get();

    // await fs.collection("Info bill of " + username + " " + uid).add({
    //   Name: userData.data().FullName,
    //   Email: userData.data().Email,
    //   Phone: cell,
    //   ResidentialAddress: residentialAddress,
    //   CartPrice: cartPrice,
    //   CartQty: cartQty,
    // });
    // const cartData = await fs.collection("Cart").doc(uid).get();
    // console.log(cartData);

    // fs.collection("Cart").doc(uid).delete();
  };

  return (
    <div className="shade-area">
      <div className="modal-container">
        <form className="form-group-cart" onSubmit={handleCashOnDelivery}>
          <h1>Bill</h1>

          <input
            type="text"
            name="name"
            id="name"
            className="form-control-cart"
            placeholder="Tên khách hàng"
            value={bill.name}
            onChange={onChange}
          />

          <input
            type="number"
            name="phone"
            placeholder="SDT"
            className="form-control-cart"
            id="phone"
            value={bill.phone}
            onChange={onChange}
          />

          <input
            type="text"
            className="form-control-cart"
            placeholder="Địa chỉ"
            name="dc"
            required
            onChange={onChange}
            value={bill.dc}
          />

          <input
            type="date"
            name="datetime"
            className="form-control-cart"
            id="datetime"
            placeholder="Ngày"
            value={bill.datetime}
            onChange={onChange}
          />
          <br></br>
          <label>Số lượng</label>
          <input
            type="text"
            className="form-control-cart"
            readOnly
            required
            value={cartQty}
          />
          <br></br>
          <label>Tổng đơn hàng</label>
          <input
            type="text"
            className="form-control-cart"
            readOnly
            required
            value={cartPrice}
          />

          <input
            type="text"
            className="form-control-cart  hidden"
            readOnly
            required
            value={trangthai}
          />
          <br></br>
          <button type="submit" className="btn btn-success">
            Đặt
          </button>
        </form>
        <div className="delete-icon" onClick={handleCloseModal}>
          x
        </div>
      </div>
    </div>
  );
};

export default Modal;
