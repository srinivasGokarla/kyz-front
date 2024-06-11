import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://kyz-back.onrender.com/api/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://kyz-back.onrender.com/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  return (
    <>
     <h1 className="pro">Products</h1>
     <div className="add-product ">
     <Link to="/add-product" className="add-product-link" >Add Product</Link>
     </div>
    
    <div  className="product-list-container" >
     
    
<ul>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2> Name : {product.name}</h2>
                <p> Price : {product.price} Rs/-</p>
                <p>{product.type}</p>
              </div>
              <div className="product-actions">
                <Link to={`/edit-product/${product._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
    </div>
    </>
    
  );
};

export default ProductList;
