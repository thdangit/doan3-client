import React from "react";
import { IndividualBillProduct } from "./IndividualBillProduct";

const BillProduct = ({ cartProducts }) => {
  return cartProducts.map((cartProduct) => (
    <IndividualBillProduct key={cartProduct.ID} cartProduct={cartProduct} />
  ));
};
export default BillProduct;
