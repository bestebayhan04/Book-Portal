import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../Router/api";
import "../comp_css/Blacklist.css";

const Blacklist = () => {
    const [blacklistItems, setBlacklistItems] = useState([]);
    const userId = localStorage.getItem('userid');
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            // Fetch the blacklist data for the user
            api.get(`/ecom/blacklist/${userId}`)
                .then(response => {
                    console.log('Blacklist data:', response.data);  // Log the response data
                    setBlacklistItems(response.data); // Store the blacklist items in state
                })
                .catch(error => {
                    console.error('Error fetching blacklist:', error);  // Log any errors
                    if (error.response) {
                        console.error('Error response:', error.response.data);
                        console.error('Error status:', error.response.status);
                        console.error('Error headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Error request:', error.request);
                    } else {
                        console.error('General Error message:', error.message);
                    }
                });
        } else {
            console.error('No userId found in localStorage');  // Log if userId is missing
        }
    }, [userId]);

    const removeSeller = (sellerName) => {
        const blacklistId = blacklistItems[0]?.blacklist.blacklistId; // Assuming all items have the same blacklistId
        if (blacklistId) {
            // Remove the seller from the blacklist via API and update the state
            api.delete(`/ecom/blacklist/remove-seller/${blacklistId}/${sellerName}`)
                .then(() => {
                    // Filter out the removed seller from the state
                    setBlacklistItems(blacklistItems.filter(item => item.seller.name !== sellerName));
                })
                .catch(error => console.error('Error removing seller from blacklist:', error));
        }
    };

    return (
        <div className="blacklist-container">
            <h2>Your Blacklist</h2>
            {/* Display a message if the blacklist is empty */}
            {blacklistItems.length === 0 ? (
                <p className="empty-message">No sellers in blacklist</p>
            ) : (
                <ul className="blacklist">
                    {/* Map over the blacklistItems array and render each seller */}
                    {blacklistItems.map(item => (
                        <li key={item.blacklistItemId} className="blacklist-item">
                            <span className="seller-name">{item.seller.name}</span>
                            <button
                                className="remove-button"
                                onClick={() => removeSeller(item.seller.name)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {/* Button to navigate back to the main page */}
            <div className="back-button-container">
                <button
                    className="back-button"
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Go back to main page
                </button>
            </div>
        </div>

    );
};

export default Blacklist;
