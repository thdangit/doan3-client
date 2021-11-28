import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet";
// import CartItem from "../components/CartItem";
import Button from "../components/Button";

// import productData from "../assets/fake-data/products";
import numberWithCommas from "../utils/numberWithCommas";
import { auth, fs } from "../firebaseConfig";
// import Grid from './Grid'
// import ProductCard from './ProductCard'
// import { useHistory } from "react-router-dom";
import CartProducts from "./CartProducts";

import "../pages/custom.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value);

  //   const [cartProducts, setCartProducts] = useState(
  //     productData.getCartItemsInfo(cartItems)
  //   );

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // setCartProducts(productData.getCartItemsInfo(cartItems));
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    );
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    );
  }, [cartItems]);

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
  //   console.log(username);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart of " + username + " " + uid).onSnapshot(
          (snapshot) => {
            const newCartProduct = snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setCartProducts(newCartProduct);
          }
        );
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  });

  // console.log(cartProducts);

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

  return (
    <Helmet title="Giỏ hàng">
      <div className="cart">
        <div className="cart__info">
          <div className="cart__info__txt">
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className="cart__info__txt__price">
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className="cart__info__btn">
            <Button size="block">Đặt hàng</Button>
            <Link to="/catalog">
              <Button size="block">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className="cart__list">
          {/* {
                        cartProducts.map((item, index) => (
                            <CartItem item={item} key={index}/>
                        ))
                    } */}

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
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
