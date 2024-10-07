import React, { useState } from "react";
import "../comp_css/updateform.css";

const UpdateProductForm = ({ product, onUpdate, onClose }) => {
  // Initialize the updatedProduct state with product data including sellerName
  const [updatedProduct, setUpdatedProduct] = useState({
    ...product,
    sellerName: product.seller ? product.seller.name : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle changes specifically for sellerName
    if (name === "sellerName") {
      setUpdatedProduct({
        ...updatedProduct,
        seller: { ...updatedProduct.seller, name: value },
        sellerName: value // Update sellerName in the state
      });
    } else {
      setUpdatedProduct({ ...updatedProduct, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass updated product data to onUpdate callback
    onUpdate(updatedProduct);
  };

  return (
      <>
        <div className="modal-backdrop">
          <div className="update-product-form">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="imageUrl">Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={updatedProduct.imageUrl}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="category">Category:</label>
                <select
                    name="category"
                    value={updatedProduct.category}
                    onChange={handleChange}
                >
                  <option value="headphone">Headphones</option>
                  <option value="phone">Phones</option>
                  <option value="powerbank">Powerbanks</option>
                  <option value="watch">Watches</option>
                </select>
              </div>
              <div>
                <label htmlFor="sellerName">Seller Name:</label>
                <input
                    type="text"
                    name="sellerName"
                    value={updatedProduct.sellerName}
                    onChange={handleChange}
                />
              </div>
              <button type="submit">Update</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </form>
          </div>
        </div>
      </>
  );
};

export default UpdateProductForm;
