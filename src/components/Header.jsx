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
  // console.log(user);

  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/LoginData");
    });
  };
  // get username
  // function GetCurrentUser() {
  //   const [user, setUser] = useState(null);
  //   useEffect(() => {
  //     auth.onAuthStateChanged((user) => {
  //       if (user) {
  //         fs.collection("users")
  //           .doc(user.uid)
  //           .get()
  //           .then((snapshot) => {
  //             setUser(snapshot.data().FullName);
  //           });
  //       } else {
  //         setUser(null);
  //       }
  //     });
  //   }, []);
  //   return user;
  // }

  const username = GetCurrentUser();

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart of " + username + " " + user.uid).onSnapshot(
          (snapshot) => {
            const qty = snapshot.docs.length;
            setTotalProducts(qty);
          }
        );
      }
    });
  }, [username]);

  // const viewCarrt = () => {
  //   console.log("viewcarrt");
  // };
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
                <div
                  className="header__menu__right"
                  user={user}
                  totalProducts={totalProducts}
                >
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
                  <span className="cart-indicator">{totalProducts}</span>
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
