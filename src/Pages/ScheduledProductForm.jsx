import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScheduledProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
  });
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://kyz-back.onrender.com/api/product/schedule",
        { product, minutes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/product-list");
    } catch (error) {
      console.log("Error scheduling product:", error);
    }
  };

  return (
    <div>
      <h1>Schedule Product Addition</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={product.type}
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Time in Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <button type="submit">Schedule Product</button>
      </form>
    </div>
  );
};

export default ScheduledProductForm;
