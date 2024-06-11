import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>
        <Link to={"/"}>Kryzen Solutions</Link>
      </h2>
      <ul>
        {token ? (
          <li>
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
