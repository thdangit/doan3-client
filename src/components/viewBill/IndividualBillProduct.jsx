import React, { useState, useEffect } from "react";

import "../../pages/custom.css";

import { auth, fs } from "../../firebaseConfig";
import { toast } from "react-toastify";

export const IndividualBillProduct = ({ cartProduct }) => {
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

  return (
    <div className="product">
      <div className="product-img">
        <img src={cartProduct.hinhanh.url} alt="product-img" />
      </div>
      <div className="title-cart-item">
        <div className="product-text name">
          {cartProduct.name} - {cartProduct.gia} VNĐ
        </div>

        <span>Số lượng</span>

        <div className="product-text quantity-box">
          <div>{cartProduct.qty}</div>
        </div>
      </div>

      <div className="cart-item-end">
        {/* <div className="product-text cart-price">
          {cartProduct.TotalProductPrice} VNĐ
        </div> */}
      </div>
    </div>
  );
};
