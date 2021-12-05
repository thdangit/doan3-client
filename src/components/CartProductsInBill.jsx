import React from "react";
import { IndividualCartProductInBill } from "./IndividualCartProductInBill";

const CartProducts = ({
  cartProducts,
}) => {
  return cartProducts.map((cartProduct) => (
    <IndividualCartProductInBill
      key={cartProduct.ID}
      cartProduct={cartProduct}
    />
  ));
};
export default CartProducts;
