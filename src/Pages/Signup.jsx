import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://kyz-back.onrender.com/api/user/register`, {
        email: email,
        username: userName,
        phone: phone,
        password: password,
      });
      setMessage(res.data.message);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error", error);
      setMessage("Failed to register");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/product-list");
    }
  }, [navigate]);

  return (
    <>
      <div className="signupPage">
        <h1>Register</h1>
        {message && <p>{message}</p>}
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="button" value={"Register"} />
        </form>
        <p>
          Already have an account?{" "}
          <span>
            <Link style={{ color: "red", fontWeight: "900" }} to={"/login"}>
              Login
            </Link>
          </span>{" "}
        </p>
      </div>
    </>
  );
}
export default Signup;

