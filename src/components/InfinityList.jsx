import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { auth, fs } from "../firebaseConfig";
// import Grid from './Grid'
// import ProductCard from './ProductCard'

import { ProductsData } from "../pages/ProductsData";

const InfinityList = (props) => {
  const perLoad = 6; // items each load

  const listRef = useRef(null);

  const [data, setData] = useState([]);

  const [load, setLoad] = useState(true);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setData(props.data.slice(0, perLoad));
    setIndex(1);
  }, [props.data]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (listRef && listRef.current) {
        if (
          window.scrollY + window.innerHeight >=
          listRef.current.clientHeight + listRef.current.offsetTop + 200
        ) {
          console.log("bottom reach");
          setLoad(true);
        }
      }
    });
  }, [listRef]);

  useEffect(() => {
    const getItems = () => {
      const pages = Math.floor(props.data.length / perLoad);
      const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

      if (load && index <= maxIndex) {
        const start = perLoad * index;
        const end = start + perLoad;

        setData(data.concat(props.data.slice(start, end)));
        setIndex(index + 1);
      }
    };
    getItems();
    setLoad(false);
  }, [load, index, data, props.data]);

  // get data

  // getting current user function
  //   function GetCurrentUser() {
  //     const [user, setUser] = useState(null);
  //     useEffect(() => {
  //       auth.onAuthStateChanged((user) => {
  //         if (user) {
  //           fs.collection("users")
  //             .doc(user.uid)
  //             .get()
  //             .then((snapshot) => {
  //               setUser(snapshot.data().FullName);
  //             });
  //         } else {
  //           setUser(null);
  //         }
  //       });
  //     }, []);
  //     return user;
  //   }

  //   const user = GetCurrentUser();
  // console.log(user);

  // state of products
  const [products, setProducts] = useState([]);

  // getting products function
  const getProducts = async () => {
    const products = await fs.collection("products").get();
    const productsArray = [];
    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === products.docs.length) {
        setProducts(productsArray);
      }
    }
  };

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

  useEffect(() => {
    getProducts();
  }, []);

  let Product;

  const addToCart = (product) => {
    Product = product;
    Product["qty"] = 1;
    Product["TotalProductPrice"] = Product.qty * Product.price;
    fs.collection("Cart add " + uid)
      .doc(product.ID)
      .set(Product)
      .then(() => {
        console.log("successfully added to cart");
      });
    console.log(product);
    // if (uid !== null) {
    //   console.log(product);
    // } else {
    //   // props.history.push("/Login");
    // }
  };

  return (
    <div ref={listRef}>
      {/* <Grid
                col={3}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                    data.map((item, index) => (
                        <ProductCard
                            key={index}
                            img01={item.image01}
                            img02={item.image02}
                            name={item.title}
                            price={Number(item.price)}
                            slug={item.slug}
                        />
                    ))
                }
            </Grid> */}

      {products.length > 0 && (
        <div className="container-fluid">
          <div className="products-box">
            <ProductsData products={products} addToCart={addToCart} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">Please wait....</div>
      )}
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
