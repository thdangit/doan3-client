import React, { useState } from "react";
import { auth, fs } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Register/AppRegister.css";
import Button from "../components/Button";
import "../pages/custom.css";

const SignUpData = () => {
  const history = useHistory();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [password, setPassword] = useState("");
  const [chucvu] = useState("Customer");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // console.log(fullName, email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(credentials);
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            FullName: fullName,
            sdt: sdt,
            gioitinh: gioitinh,
            diachi: diachi,
            Email: email,
            Password: password,
            chucvu: chucvu,
          })
          .then(() => {
            setSuccessMsg("Đăng ký thành công!");
            setFullname("");
            setEmail("");
            setPassword("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              history.push("/catalog");
            }, 1000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div className="container-signup">
      {successMsg && (
        <>
          <div className="success-msg">{successMsg}</div>
          <br></br>
        </>
      )}
      <form className="form-group" autoComplete="off" onSubmit={handleSignup}>
        <h1>Đăng ký</h1>
        <label>Họ tên</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setFullname(e.target.value)}
          value={fullName}
        ></input>
        <br></br>

        <label>SDT</label>
        <input
          type="phone"
          className="form-control"
          required
          onChange={(e) => setSdt(e.target.value)}
          value={sdt}
        ></input>
        <br></br>

        <label>Giới tính</label>
        <br />
        <div className="item__gioitinh">
          <label for="nam">Nam</label>
          <input
            type="radio"
            name="sex"
            id="nam"
            value="Nam"
            className="form-control gioitinh"
            required
            onChange={(e) => setGioitinh(e.target.value)}
          ></input>

          <label for="nu">Nữ</label>
          <input
            type="radio"
            name="sex"
            id="nu"
            value="Nữ"
            className="form-control gioitinh"
            required
            onChange={(e) => setGioitinh(e.target.value)}
          ></input>
        </div>
        <br />
        <label>Địa chỉ</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setDiaChi(e.target.value)}
          value={diachi}
        ></input>
        <br></br>

        <label>Email</label>
        <input
          type="email"
          className="form-control"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        {/* <br></br>

        <label>Năm sinh</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setYearOfBirth(e.target.value)}
          min="1920"
          max="2022"
          value={yearOfBirth}
        ></input> */}
        <input
          type="text"
          className="form-control chucvu"
          required
          // onChange={(e) => setChucvu(e.target.value)}
          value={chucvu}
        ></input>
        <br />
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
          <Button type="submit">Đăng ký</Button>
          <span className="spannn">
            Already have an account Login
            <Link to="/LoginData" className="link">
              {" "}
              Here
            </Link>
          </span>
          {/* <button type="submit" className="btn btn-success btn-md">
            SIGN UP
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
export default SignUpData;
