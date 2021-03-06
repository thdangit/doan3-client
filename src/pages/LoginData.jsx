import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
import "../pages/custom.css";
import { toast } from "react-toastify";

const LoginData = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        toast.success("Đăng nhập thành công!!!", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
        setTimeout(() => {
          setSuccessMsg("");
          history.push("/catalog");
        }, 1200);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  return (
    <div className="container-login">
      {successMsg && (
        <>
          <div className="success-msg">{successMsg}</div>
          {/* {alert(successMsg)} */}
          <br></br>
        </>
      )}
      <form className="form-group" autoComplete="off" onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <br></br>
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
        <br></br>
        <div className="btn-box">
          <Button type="submit">Đăng nhập</Button>
          <span className="spannn">
            Don't have an account SignUp
            <Link to="/SignUpData" className="link">
              {" "}
              Here
            </Link>
          </span>
          {/* <button type="submit" className="btn btn-success btn-md">
            LOGIN
          </button> */}
        </div>
      </form>
      {errorMsg && (
        <>
          <br></br>
          <div className="error-msg">{errorMsg}</div>
        </>
      )}
    </div>
  );
};

export default LoginData;
