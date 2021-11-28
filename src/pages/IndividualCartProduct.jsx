import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import "../pages/custom.css";
// import { useDispatch } from "react-redux";
// import { updateItem, removeItem } from "../redux/shopping-cart/cartItemsSlide";
// import { useState, useRef, useEffect } from "react";

export const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };

  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
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
          $ {cartProduct.TotalProductPrice}
        </div>
        <div className="btn btn-danger btn-md cart-btn">
          {" "}
          <i className="bx bx-trash"></i>
        </div>
      </div>
    </div>
  );
};
