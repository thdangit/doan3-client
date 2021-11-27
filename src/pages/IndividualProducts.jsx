import React from "react";
import "../pages/custom.css";
import Button from "../components/Button";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  // console.log(individualProduct);

  const handleAddToCart = () => {
    addToCart(individualProduct);
  };

  return (
    <div className="product-data">
      <div className="product-data-img">
        <img src={individualProduct.hinhanh.url} alt="product-img" />
      </div>
      <div className="product-data-text title">{individualProduct.name}</div>
      <div className="product-data-text description">
        {individualProduct.mota}
      </div>
      <div className="product-data-text price">
        {" "}
        {individualProduct.gia} VNĐ
      </div>
      <div className="product-data-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={handleAddToCart}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
};
