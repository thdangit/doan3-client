import React, { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
// import CartItem from "../components/CartItem";
import Button from "../components/Button";

// import productData from "../assets/fake-data/products";
// import numberWithCommas from "../utils/numberWithCommas";
import { auth, fs } from "../firebaseConfig";
// import Grid from './Grid'
// import ProductCard from './ProductCard'
// import { useHistory } from "react-router-dom";
import CartProducts from "./CartProducts";

import Modal from "../components/Modal";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../pages/custom.css";

const Cart = () => {
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
  // console.log(username);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart of " + username + " " + user.uid).onSnapshot(
          (snapshot) => {
            const newCartProduct = snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setCartProducts(newCartProduct);
          }
        );
        // console.log(cartProducts);
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, [username]);

  // console.log(cartProducts);

  // getting the qty from cartProducts in a seperate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  // console.log(qty);

  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  // console.log(totalQty);

  // getting the TotalProductPrice from cartProducts in a seperate array
  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);

  // global variable
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.gia;
    // updating in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart of " + username + " " + uid)
          .doc(cartProduct.ID)
          .update(Product)
          .then(() => {
            console.log("increment added");
          });
      } else {
        console.log("user is not logged in to increment");
      }
    });
  };

  // cart product decrease functionality
  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.gia;
      // updating in database
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("Cart of " + username + " " + uid)
            .doc(cartProduct.ID)
            .update(Product)
            .then(() => {
              console.log("decrement");
            });
        } else {
          console.log("user is not logged in to decrement");
        }
      });
    }
  };

  const [showModal, setShowModal] = useState(false);

  const triggerModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có tổng _{totalQty} _ sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span> <span>{totalPrice} VNĐ</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block" onClick={() => triggerModal()}>
              THANH TOÁN
            </Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {cartProducts.length > 0 && (
            <div className="container-fluid">
              <div className="products-cart">
                <CartProducts
                  cartProducts={cartProducts}
                  cartProductIncrease={cartProductIncrease}
                  cartProductDecrease={cartProductDecrease}
                />
              </div>
            </div>
          )}
          {cartProducts.length < 1 && (
            <div className="container-fluid">No products to show</div>
          )}

          {showModal === true && (
            <Modal
              TotalPrice={totalPrice}
              totalQty={totalQty}
              hideModal={hideModal}
            />
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
