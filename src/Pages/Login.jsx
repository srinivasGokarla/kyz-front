import { useEffect, useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://kyz-back.onrender.com/api/user/login`, {
        email: email,
        password: password,
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/product-list");
        localStorage.setItem("token", res.data.token);
        
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error", error);
      alert("Login failed");
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="button" value="Login" />
        </form>
        <p>
          Don't have an Account{" "}
          <span>
            <Link style={{ color: "red", fontWeight: "900" }} to={"/"}>
              SignUp
            </Link>
          </span>{" "}
        </p>
      </div>
    </>
  );
}

export default Login;

