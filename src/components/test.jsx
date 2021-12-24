// import React, { useState, useEffect } from "react";
// import { auth, fs } from "../firebaseConfig";

// function Test({ TotalPrice, totalQty }) {
//   const [cartPrice] = useState(TotalPrice);
//   const [cartQty] = useState(totalQty);

//   const [bill, setBill] = useState({
//     name: "",
//     phone: "",
//     datetime: "",
//     CartPrice: cartPrice,
//     CartQty: cartQty,
//     product: [],
//   });

//   const onChange = (e) => {
//     setBill({
//       ...bill,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
// console.log(bill);
// fs.collection("Hoadon")
//   .add({
//     ...bill,
//     datetime: new Date(bill.datetime),
//   })
//   .then(function (doc) {
//     console.log(doc.id);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });
//   };

//   function GetUserUid() {
//     const [uid, setUid] = useState(null);
//     useEffect(() => {
//       auth.onAuthStateChanged((user) => {
//         if (user) {
//           setUid(user.uid);
//         }
//       });
//     }, []);
//     return uid;
//   }

//   const uid = GetUserUid();
//   console.log(uid);

//   // get username
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
//   const username = GetCurrentUser();
//   console.log(username);

//   const arrayProduct = () => {
//     // const cartData =  fs.collection("Cart of " + username + " " + uid)
//     //   .get();
//     // for (var snap of cartData.docs) {
//     //   var data = snap.data();
//     //   data.ID = snap.id;
//     //   await fs.collection("Hoadon").add(data);
//     //   await fs
//     //     .collection("Cart of " + username + " " + uid)
//     //     .doc(snap.id)
//     //     .delete();
//     // }
//   };

//   return (
//     <div className="container__test">
//       <h1>From test</h1>
//   <form onSubmit={onSubmit}>
//     <div className="item_form">
//       <label htmlFor="name">Tên KH:</label>
//       <input
//         type="text"
//         name="name"
//         id="name"
//         value={bill.name}
//         onChange={onChange}
//       />
//     </div>

//     <div className="item_form">
//       <label htmlFor="phone">SDT:</label>
//       <input
//         type="number"
//         name="phone"
//         id="phone"
//         value={bill.phone}
//         onChange={onChange}
//       />
//     </div>

//     <div className="item_form">
//       <label htmlFor="datetime">Ngày:</label>
//       <input
//         type="date"
//         name="datetime"
//         id="datetime"
//         value={bill.datetime}
//         onChange={onChange}
//       />
//     </div>

//         <br></br>
//         <label>Số lượng</label>
//         <input
//           type="text"
//           className="form-control-cart"
//           readOnly
//           required
//           value={cartQty}
//         />
//         <br></br>
//         <label>Tổng đơn hàng</label>
//         <input
//           type="text"
//           className="form-control-cart"
//           readOnly
//           required
//           value={cartPrice}
//         />

//         <div className="btn-submit">
//           <button type="submit" className="btn-sub">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Test;
