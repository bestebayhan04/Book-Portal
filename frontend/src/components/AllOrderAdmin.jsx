import React, { useState, useEffect } from "react";
import axios from "axios";
import "../comp_css/AllOrderAdmin.css";
import api from "../Router/api";  // Assuming you have a CSS file for styling

const AllOrderAdmin = () => {
    const [sellers, setSellers] = useState([]);
    const [newSellerName, setNewSellerName] = useState("");
    const [selectedSellerId, setSelectedSellerId] = useState(null);
    const [updatedSellerName, setUpdatedSellerName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch all sellers on component mount
    useEffect(() => {
        api.get("http://127.0.0.1:8080/ecom/sellers/all")
            .then(response => {
                console.log("Sellers fetched: ", response.data);
                setSellers(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error("Error fetching sellers: ", error);
                setSellers([]);  // Fallback to empty array on error
            });
    }, []);

    // Add a new seller
    const addSeller = () => {
        api.post("http://127.0.0.1:8080/ecom/sellers/add", { name: newSellerName })
            .then(response => {
                setSellers([...sellers, response.data]);
                setNewSellerName("");
            })
            .catch(error => {
                console.error("Error adding seller: ", error);
            });
    };

    // Update an existing seller's name
    const updateSeller = (sellerId) => {
        api.put(`http://127.0.0.1:8080/ecom/sellers/update/${sellerId}`, { name: updatedSellerName })
            .then(response => {
                setSellers(sellers.map(seller => seller.sellerId === sellerId ? response.data : seller));
                setSelectedSellerId(null);
                setUpdatedSellerName("");
            })
            .catch(error => {
                console.error("Error updating seller: ", error);
            });
    };

    // Delete a seller
    const deleteSeller = (sellerId) => {
        api.delete(`http://127.0.0.1:8080/ecom/sellers/delete/${sellerId}`)
            .then(() => {
                setSellers(sellers.filter(seller => seller.sellerId !== sellerId));
            })
            .catch(error => {
                console.error("Error deleting seller: ", error);
            });
    };

    // Filter sellers based on search query
    const filteredSellers = sellers.filter(seller =>
        seller.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="seller-management">
            <h1>Seller Management</h1>
            <div className="add-seller">
                <input
                    type="text"
                    value={newSellerName}
                    onChange={(e) => setNewSellerName(e.target.value)}
                    placeholder="Enter new seller name"
                    className="seller-input"
                />
                <button onClick={addSeller} style={{ marginBottom: "25px", backgroundColor: "#122b41" }} className="add-seller-button">Add Seller</button>
            </div>
            <div style={{width: "250px"}} className="search-seller">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search seller by name"
                    className="search-input"
                />
            </div>
            <ul className="seller-list">
                {filteredSellers.length === 0 ? (
                    <p>No sellers found</p>
                ) : (
                    filteredSellers.map((seller) => (
                        <li key={seller.sellerId} className="seller-item">
                            <span className="seller-name">{seller.name}</span>
                            <div className="seller-buttons">
                                <button onClick={() => {
                                    setSelectedSellerId(seller.sellerId);
                                    setUpdatedSellerName(seller.name);
                                }}>Update</button>
                                <button onClick={() => deleteSeller(seller.sellerId)}>Delete</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            {selectedSellerId && (
                <div className="update-seller">
                    <input
                        type="text"
                        value={updatedSellerName}
                        onChange={(e) => setUpdatedSellerName(e.target.value)}
                        placeholder="Enter new seller name"
                    />
                    <button onClick={() => updateSeller(selectedSellerId)}>Save</button>
                    <button onClick={() => setSelectedSellerId(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AllOrderAdmin;
