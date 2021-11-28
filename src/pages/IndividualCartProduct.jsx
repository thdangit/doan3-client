import React, { useState, useEffect } from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import "../pages/custom.css";

import { auth, fs } from "../firebaseConfig";
import { toast } from "react-toastify";

export const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
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

  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };

  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };

  const handleCartProductDelete = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart of " + username + " " + user.uid)
          .doc(cartProduct.ID)
          .delete()
          .then(() => {
            toast.success("Đã xóa!!!", {
              position: "top-right",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
          });
      }
    });
  };

  return (
    <div className="product">
      <div className="product-img">
        <img src={cartProduct.hinhanh.url} alt="product-img" />
      </div>
      <div className="title-cart-item">
        <div className="product-text name">
          {cartProduct.name} - {cartProduct.gia} VNĐ
        </div>
        <div className="product-text type">{cartProduct.mota}</div>

        <span>Số lượng</span>

        <div className="product-text quantity-box">
          <div
            className="action-btns minus"
            onClick={handleCartProductDecrease}
          >
            <Icon icon={minus} size={20} />
          </div>
          <div>{cartProduct.qty}</div>
          <div className="action-btns plus" onClick={handleCartProductIncrease}>
            <Icon icon={plus} size={20} />
          </div>
        </div>
      </div>

      <div className="cart-item-end">
        <div className="product-text cart-price">
          {cartProduct.TotalProductPrice} VNĐ
        </div>
        <div
          className="btn btn-danger btn-md cart-btn"
          onClick={handleCartProductDelete}
        >
          {" "}
          <i className="bx bx-trash"></i>
        </div>
      </div>
      <div className="km">
        <span>Mã khuyến mãi</span>
        <input className="text-km" type="text" />
      </div>
    </div>
  );
};
