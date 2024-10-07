import React, { useState } from "react";
import axios from "axios";
import api from "../Router/api";
import "../comp_css/AddProduct.css";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    available: true,
    sellerName: "", // Add sellerName to the state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/ecom/products/add", product);
      console.log("Product added successfully:", response.data);
      setProduct({
        name: "",
        imageUrl: "",
        description: "",
        price: 0,
        category: "",
        available: true,
        sellerName: "", // Reset sellerName
      });
      alert("Product Added Successfully......");
      navigate("/admin/admin");
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error adding product:", error.response.data);
    }
  };

  return (
      <div className="adminAddProduct">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Product Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter product price"
            />
          </div>
          <div className="input-group select">
            <label htmlFor="category">Category:</label>
            <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="headphone">Headphones</option>
              <option value="phone">Phones</option>
              <option value="powerbank">Powerbanks</option>
              <option value="watch">Watches</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="sellerName">Seller Name:</label>
            <input
                type="text"
                id="sellerName"
                name="sellerName"
                value={product.sellerName}
                onChange={handleChange}
                placeholder="Enter seller name"
            />
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
  );
}

export default AddProduct;