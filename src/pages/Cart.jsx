import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";

import Button from "../components/Button";

import { auth, fs } from "../firebaseConfig";

import CartProducts from "./CartProducts";

import Modal from "../components/Modal";
// import Test from "../components/test";

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
        fs.collection("Cart")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const newCartProduct = snapshot.data().cart;
            setCartProducts(newCartProduct);
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        // console.log(cartProducts);
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, []);

  console.log(cartProducts.length);

  // getting the qty from cartProducts in a seperate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  }, []);

  console.log(qty);

  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  console.log(totalQty);

  // getting the TotalProductPrice from cartProducts in a seperate array
  const price = cartProducts.map((cartProduct) => {
    return Number(cartProduct.gia);
  }, []);

  // console.log("Array pro", price);

  // reducing the price in a single value
  const reducerOfPrice = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);
  console.log(totalPrice);
  // global variable
  let cart;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    cart = cartProduct;
    cart.qty = cart.qty + 1;
    cart.TotalProductPrice = cart.qty * cart.gia;

    console.log(cart.qty);
    // updating in database
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     fs.collection("Cart")
    //       .doc(uid)
    //       .update(
    //         cart.map()
    //       )
    //       .then(() => {
    //         console.log("increment added");
    //       });
    //   } else {
    //     console.log("user is not logged in to increment");
    //   }
    // });
  };

  // cart product decrease functionality
  const cartProductDecrease = (cartProduct) => {
    cart = cartProduct;

    if (cart.qty > 1) {
      cart.qty = cart.qty - 1;
      cart.TotalProductPrice = cart.qty * cart.gia;

      console.log(cart.qty);
    }
    // Product = cartProduct;
    // if (Product.qty > 1) {
    //   Product.qty = Product.qty - 1;
    //   Product.TotalProductPrice = Product.qty * Product.gia;
    //   // updating in database
    //   auth.onAuthStateChanged((user) => {
    //     if (user) {
    //       fs.collection("Cart of " + username + " " + uid)
    //         .doc(cartProduct.ID)
    //         .update(Product)
    //         .then(() => {
    //           console.log("decrement");
    //         });
    //     } else {
    //       console.log("user is not logged in to decrement");
    //     }
    //   });
    // }
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
