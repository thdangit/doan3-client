import React, { useState } from "react";
import "./AppRegister.css";
import FormInput from "../../components/FormInput";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo-2.png";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    sdt: "",
    birthday: "",
    password: "",
    confirmPassword: "",
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
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "sdt",
      type: "number",
      placeholder: "SDT",
      errorMessage: "SDT không hợp lệ",
      pattern: "^[0-9]{10,11}$",
      label: "Số điện thoại",
      required: true,
    },
    {
      id: 4,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Ngày sinh",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Mật khẩu phải có 8-20 ký tự và bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt!",
      label: "Mật khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Mật khẩu không khớp!",
      label: "Xác nhận mật khẩu",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clickSubmit = (e) => {
    console.log(inputs);
  };

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [numberPhone, setNumberPhone] = useState("");
  // const [birthday, setBirthday] = useState("");
  // const [password, setPassword] = useState("");
  // const [cfPassword, setCfPassword] = useState("");

  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="app-register">
      <form onSubmit={handleSubmit}>
        <h1 className="title-register">Đăng ký</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {/* <FormInput
        
        ></FormInput> */}
        <button className="btnLogin" onClick={clickSubmit}>
          Đăng ký
        </button>
        <div className="bottom">
          <Link to="/login">
            <span className="add-account">Have an account? Sign In</span>
          </Link>
          <Link to="/">
            <img className="imgLogo" src={Logo} alt="logo" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
