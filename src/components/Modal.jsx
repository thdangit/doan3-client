import React, { useState, useEffect } from "react";
import { auth, fs } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const history = useHistory();

  // form states
  const [cell, setCell] = useState(null);
  const [residentialAddress, setResidentialAddress] = useState("");
  const [cartPrice] = useState(TotalPrice);
  const [cartQty] = useState(totalQty);

  // close modal
  const handleCloseModal = () => {
    hideModal();
  };

  // cash on delivery
  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    // console.log(cell, residentialAddress, cartPrice, cartQty);

    const uid = auth.currentUser.uid;
    const userData = await fs.collection("users").doc(uid).get();
    await fs.collection("Info bill of " + username + " " + uid).add({
      Name: userData.data().FullName,
      Email: userData.data().Email,
      Phone: cell,
      ResidentialAddress: residentialAddress,
      CartPrice: cartPrice,
      CartQty: cartQty,
    });
    const cartData = await fs
      .collection("Cart of " + username + " " + uid)
      .get();
    for (var snap of cartData.docs) {
      var data = snap.data();
      data.ID = snap.id;
      await fs.collection("Detail bill of " + username + " " + uid).add(data);
      await fs
        .collection("Cart of " + username + " " + uid)
        .doc(snap.id)
        .delete();
    }
    hideModal();
    history.push("/");
    toast.success("Đặt hàng thành công!!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div className="shade-area">
      <div className="modal-container">
        <form className="form-group-cart" onSubmit={handleCashOnDelivery}>
          <h1>Bill</h1>
          <input
            type="number"
            className="form-control-cart"
            placeholder="SDT"
            required
            onChange={(e) => setCell(e.target.value)}
            value={cell}
          />
          <br></br>
          <input
            type="text"
            className="form-control-cart"
            placeholder="Địa chỉ"
            required
            onChange={(e) => setResidentialAddress(e.target.value)}
            value={residentialAddress}
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
