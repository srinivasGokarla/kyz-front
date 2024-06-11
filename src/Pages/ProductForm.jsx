import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(`https://kyz-back.onrender.com/api/product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProduct(res.data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (id) {
        await axios.put(`https://kyz-back.onrender.com/api/product/${id}`, product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("https://kyz-back.onrender.com/api/product/create", product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate("/product-list");
    } catch (error) {
      console.log("Error saving product:", error);
    }
  };

  return (
    <div className="product-form-container" >
      
      <h1>{id ? "Update Product" : "Add Product"}</h1>
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
        <select
          value={product.type}
          onChange={(e) => setProduct({ ...product, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="groceries">Groceries</option>
          <option value="kids">Kids</option>
          <option value="home">Home</option>
          <option value="sports">Sports</option>
          <option value="books">Books</option>
          <option value="beauty">Beauty</option>
          <option value="tools">Tools</option>
          <option value="outdoor">Outdoor</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <button type="submit">{id ? "Update Product" : "Add Product"}</button>

        <button  className="close-button" onClick={() => navigate("/product-list")} >Close</button>
        
      </form>
    </div>
  );
};

export default ProductForm;
