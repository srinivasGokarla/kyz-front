import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import ProductList from "./Pages/ProductList";
import ProductForm from "./Pages/ProductForm";
import ScheduledProductForm from "./Pages/ScheduledProductForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/product-list"
          element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-product"
          element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-product/:id"
          element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/schedule-product"
          element={isAuthenticated ? <ScheduledProductForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
