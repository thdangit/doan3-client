import React from "react";

import "../pages/custom.css";

export const IndividualCartProductInBill = ({ cartProduct }) => {
  // get username

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
          <div>{cartProduct.qty}</div>
        </div>
      </div>

      <div className="cart-item-end">
        <div className="product-text cart-price">
          {cartProduct.TotalProductPrice} VNĐ
        </div>
      </div>
    </div>
  );
};
