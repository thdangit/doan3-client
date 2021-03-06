import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section, { SectionTitle, SectionBody } from "../components/Section";
import PolicyCard from "../components/PolicyCard";
import Grid from "../components/Grid";
import ProductCard from "../components/ProductCard";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
import productData from "../assets/fake-data/products";

import banner from "../assets/images/banner.jpg";
import { ProductsData } from "./ProductsData";

import { fs, auth } from "../firebaseConfig";
const Home = () => {
  const [products, setProducts] = useState([]);

  const history = useHistory();

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

  useEffect(() => {
    getProducts();
  }, []);

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

  let Product;
  const addToCart = (product) => {
    // Product = product;
    // Product["qty"] = 1;
    // Product["TotalProductPrice"] = Product.qty * Product.price;
    // fs.collection("Cart add " + uid)
    //   .doc(product.ID)
    //   .set(Product)
    //   .then(() => {
    //     console.log("successfully added to cart");
    //   });
    // console.log(product, uid);
    // if (uid !== null) {
    //   console.log(product);
    // } else {
    //   props.history.push("/Login");
    // }

    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart of " + username + " " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          alert("successfully added to cart");
        });
    } else {
      history.push("/LoginData");
    }
  };

  return (
    <Helmet title="Trang ch???">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}

      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}

      {/* best selling section */}
      <Section>
        <SectionTitle>top s???n ph???m b??n ch???y trong tu???n</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {/* {productData.getProducts(4).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))} */}

            <ProductsData products={products} addToCart={addToCart} />
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}

      {/* new arrival section */}
      <Section>
        <SectionTitle>s???n ph???m m???i</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {/* {productData.getProducts(8).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))} */}

            <ProductsData products={products} addToCart={addToCart} />
          </Grid>
        </SectionBody>
      </Section>
      {/* end new arrival section */}

      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}

      {/* popular product section */}
      <Section>
        <SectionTitle>ph??? bi???n</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(12).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image01}
                img02={item.image02}
                name={item.title}
                price={Number(item.price)}
                slug={item.slug}
              />
            ))}

            {/* <ProductsData products={products} /> */}
          </Grid>
        </SectionBody>
      </Section>
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
