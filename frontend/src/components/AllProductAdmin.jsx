import React, { useState, useEffect } from "react";
import axios from "axios";
import "../comp_css/AllProductAdmin.css";
import api from "../Router/api";
import UpdateProductForm from "./UpdateProductForm";

const AllProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceOrder, setPriceOrder] = useState("All");
    const [nameSearch, setNameSearch] = useState("");
    const [sellerSearch, setSellerSearch] = useState("");

    const filterProducts = (category, priceOrder, nameSearch, sellerSearch, data) => {
        let filteredProducts = data;

        if (category !== "All") {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === category
            );
        }

        if (priceOrder === "LowToHigh") {
            filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        } else if (priceOrder === "HighToLow") {
            filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        }

        if (nameSearch !== "") {
            const searchQuery = nameSearch.toLowerCase();
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery)
            );
        }

        if (sellerSearch !== "") {
            const sellerQuery = sellerSearch.toLowerCase();
            filteredProducts = filteredProducts.filter(
                (product) => product.seller && product.seller.name.toLowerCase().includes(sellerQuery)
            );
        }

        setFilteredProducts(filteredProducts);
    };

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8080/ecom/products/all?sort=desc")
            .then((response) => {
                console.log("API Response:", response.data);
                const sortedProducts = response.data.sort(
                    (a, b) => b.productId - a.productId
                );
                setProducts(sortedProducts);
                filterProducts(selectedCategory, priceOrder, nameSearch, sellerSearch, sortedProducts);
                setDeleted(false);
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    }, [deleted, selectedCategory, priceOrder, nameSearch, sellerSearch]);

    const updateProduct = (productIdToUpdate) => {
        const productToUpdate = products.find(
            (product) => product.productId === productIdToUpdate
        );
        setSelectedProduct(productToUpdate);
        setShowUpdateModal(true);
    };

    const closeUpdateModal = () => {
        setSelectedProduct(null);
        setShowUpdateModal(false);
    };

    const handleUpdate = (updatedProduct) => {
        api
            .put(`/ecom/products/update/${updatedProduct.productId}`, updatedProduct)
            .then((response) => {
                console.log(response.data);
                closeUpdateModal();

                axios
                    .get("http://127.0.0.1:8080/ecom/products/all?sort=desc")
                    .then((response) => {
                        const sortedProducts = response.data.sort(
                            (a, b) => b.productId - a.productId
                        );
                        setProducts(sortedProducts);
                        filterProducts(selectedCategory, priceOrder, nameSearch, sellerSearch, sortedProducts);
                    })
                    .catch((error) => {
                        console.error("Error fetching data from the API:", error);
                    });
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    const deleteProduct = (productIdToDelete) => {
        api
            .delete(`/ecom/products/${productIdToDelete}`)
            .then((response) => {
                alert(response.data);

                const updatedProducts = products.filter(
                    (product) => product.productId !== productIdToDelete
                );
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts);
                setDeleted(true);
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                alert(error.response.data.message);
            });
    };

    return (
        <>
            <h1 style={{ color: "black", textAlign: "center", margin: "20px 0" }}>
                ALL Live Products
            </h1>

            <div className="filter-section">
                <h2>FILTER</h2>
                <hr />
                <div className="filter-container">
                    <div className="filter-item">
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                            }}
                        >
                            <option value="All">All</option>
                            <option value="headphone">Headphones</option>
                            <option value="phone">Phones</option>
                            <option value="powerbank">Powerbanks</option>
                            <option value="watch">Watches</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Price</label>
                        <select
                            value={priceOrder}
                            onChange={(e) => {
                                setPriceOrder(e.target.value);
                            }}
                        >
                            <option value="All">All</option>
                            <option value="LowToHigh">Low to High</option>
                            <option value="HighToLow">High To Low</option>
                        </select>
                    </div>
                    <div className="filter-item" style={{ marginTop: "20px" }}>
                        <label>By Name</label>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={nameSearch}
                            onChange={(e) => setNameSearch(e.target.value)}
                        />
                    </div>
                    <div className="filter-item" style={{ marginTop: "20px" }}>
                        <label>By Seller</label>
                        <input
                            type="text"
                            placeholder="Search by seller"
                            value={sellerSearch}
                            onChange={(e) => setSellerSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {showUpdateModal && (
                <div className="update-modal">
                    <UpdateProductForm
                        product={selectedProduct}
                        onUpdate={handleUpdate}
                        onClose={closeUpdateModal}
                    />
                </div>
            )}

            <div className="product-container1">
                {filteredProducts.length === 0 ? (
                    <h2 style={{ textAlign: "center", color: "red" }}>
                        No Products Available
                    </h2>
                ) : (
                    filteredProducts.map((product) => (
                        <div className="product-card1" key={product.productId}>
                            <div className="product-image11">
                                <img src={product.imageUrl} alt={product.name} />
                            </div>
                            <div className="product-info1">
                                <h2>{product.name}</h2>
                                <p>Product ID: {product.productId}</p>
                                <p>Category: {product.category}</p>
                                <p>Seller: {product.seller ? product.seller.name : "Unknown"}</p>
                                <p>
                                    Description:{" "}
                                    {product.description.length > 30
                                        ? product.description.substring(0, 50) + "..."
                                        : product.description}
                                </p>

                                <h2 style={{marginRight:"350px"}} className="product-price1">Price: $ {product.price}</h2>
                                <div className="button-container1">
                                    <button onClick={() => updateProduct(product.productId)}>
                                        update
                                    </button>
                                    <button onClick={() => deleteProduct(product.productId)}>
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>


    );
};

export default AllProductAdmin;
