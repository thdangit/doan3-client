import React, { useState } from "react";
import "./AppLogin.css";
import FormInput from "../../components/FormInput";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo-2.png";

// import { db } from "../../firebaseConfig";
// import { collection } from "firebase/firestore";
// import { doc, setDoc } from "firebase/firestore";

const AppLogin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Tên người dùng phải có 3-16 ký tự và không được bao gồm bất kỳ ký tự đặc biệt nào!",
      label: "Tên đăng nhập",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Mật khẩu phải có 8-20 ký tự và bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt!",
      label: "Mật khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-login">
      <form onSubmit={handleSubmit}>
        <h1 className="title-login">Đăng nhập</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="btnLogin">Đăng nhập</button>
        <div className="bottom">
          <Link to="/register">
            <span className="add-account">Don't have an account? Sign Up</span>
          </Link>
          <Link to="/">
            <img className="imgLogo" src={Logo} alt="logo" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AppLogin;
