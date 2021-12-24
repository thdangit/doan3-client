import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/images/Logo-2.png";

import { auth, fs } from "../firebaseConfig";

import { useHistory } from "react-router-dom";
import "../pages/custom.css";
// import Button from "./Button";

const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Thực đơn",
    path: "/catalog",
  },
  {
    display: "Cộng đồng",
    path: "/accessories",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName, user);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  console.log(user);

  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/LoginData");
    });
  };

  const username = GetCurrentUser();

  const [cartProducts, setCartProducts] = useState([]);

  // getting the qty from cartProducts in a seperate array
  const qty = cartProducts.map((cartProduct) => {
    return cartProduct.qty;
  });

  // console.log(qty.length);

  // reducing the qty in a single value
  const reducerOfQty = (accumulator, currentValue) =>
    accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);

  // console.log(totalQty);
  var today = new Date();
  var time = today.getSeconds();

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
      } else {
        console.log("user is not signed in to retrieve cart");
      }
    });
  }, [time]);
  console.log(time);

  // console.log(cartProducts.length);

  return (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            {!user && (
              <>
                {/* <div>
                <Link className="navlink" to="signup">
                  SIGN UP
                </Link>
              </div>
              <div>
                <Link className="navlink" to="login">
                  LOGIN
                </Link>
              </div> */}
                <div className="header__menu__right" user="" totalProducts="">
                  <div className="header__menu__item header__menu__right__item">
                    <i className="bx bx-search"></i>
                  </div>
                  <div className="header__menu__item header__menu__right__item">
                    <Link to="/LoginData">
                      <i className="bx bx-cart-alt"></i>
                    </Link>
                  </div>
                  <div className="header__menu__item header__menu__right__item">
                    <Link to="/LoginData">
                      <i className="bx bx-user"></i>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {user && (
              <>
                {/* <div className="cart-menu-btn">
                <span className='cart-indicator'>{totalQty}</span>
              </div> */}
                <div className="header__menu__item header__menu__right__item cartCustom">
                  <Link to="/cart">
                    <i className="bx bx-cart-alt"></i>
                  </Link>
                  <span className="cart-indicator">{totalQty}</span>
                </div>

                <div className="header__menu__item header__menu__right__item">
                  <Link className="navLink" to="/ViewBill">
                    <i className="bx bx-user"></i>
                    <p className="username">{user}</p>
                  </Link>
                </div>

                <div className="header__menu__item header__menu__right__item">
                  <i class="bx bx-log-in-circle" onClick={handleLogout}></i>
                </div>
                {/* <Button className="custom" onClick={handleLogout}>
                LOGOUT
              </Button> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
