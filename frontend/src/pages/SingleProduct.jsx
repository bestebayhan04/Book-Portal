import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from '../Router/api'
import "../comp_css/SingleProduct.css";
import axios from "axios";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const userid = localStorage.getItem("userid");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/ecom/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, [productId]);

  const addProductToCart = (productid) => {

      if (!userid) {
          alert("Please log in to add products to the fav list.");
          return;
      }

    api
      .post(
        `/ecom/cart/add-product?userId=${userid}&productId=${productid}`
      )
      .then((response) => {

        localStorage.setItem("cartid", response.data.cartId);
        alert("Product added to fav list.");
      })
      .catch((error) => {
        alert("Product Already in fav list.");
      });
  };

  const addProductToBlackList = (sellerName) => {

      if (!userid) {
          alert("Please log in to add sellers to the blacklist.");
          return;
      }

    api
        .post(
            `/ecom/blacklist/add-seller?userId=${userid}&sellerName=${sellerName}`
        )
        .then((response) => {

          alert("Seller added to the blacklist.");
        })
        .catch((error) => {
            alert("Error adding seller to blacklist. Check if the seller is already blacklisted or if there is a different issue.");
            console.error("Error details: ", error);
        });
  };

  return (
      <>
        <h1 style={{ color: "green", textAlign: "center", margin: "20px", fontSize: "2.5em", fontWeight: "lighter" }}>
          Single Product
        </h1>
        <div className="product-container">
          <div className="product_image">
            <img src={product.imageUrl} alt={product.name} />
          </div>

          <div className="product_details">
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
            <p>Price: $ {product.price}</p>
            <p>Seller: {product.seller ? product.seller.name : "Unknown"}</p>

            <div>
              <button
                  onClick={() => {
                    addProductToCart(product.productId);
                  }}
              >
                Add to List
              </button>
            </div>
            <div>
                <button
                    onClick={() => {
                        if (product.seller && product.seller.name) {
                            addProductToBlackList(product.seller.name);
                        } else {
                            alert("Seller information is not available.");
                        }
                    }}
                >
                    Add to Blacklist
                </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                  onClick={() => {
                    navigate("/");
                  }}
              >
                Go Back to Main Page
              </button>
            </div>
          </div>
        </div>
      </>


  );
};

export default SingleProduct;
