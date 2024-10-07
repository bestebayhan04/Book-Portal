import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Router/api';
import '../comp_css/AddProduct.css'; // Reuse AddProduct.css to maintain consistency

const EditCustomerDetails = () => {
    const { userId } = useParams(); // Get the userId from the URL parameters
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        registerTime: '',
        userAccountStatus: '',
    });

    useEffect(() => {
        if (userId) {
            // Fetch the customer details using the userId from the URL
            api.get(`/ecom/customers/${userId}`)
                .then((response) => {
                    setCustomer(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching customer details:', error);
                });
        }
    }, [userId]); // Re-run this effect when the userId changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Call API to update customer details
        api.put(`/ecom/customers/update/${userId}`, customer)
            .then(() => {
                alert('Customer details updated successfully.');
                navigate('/admin/admin'); // Navigating back to /admin/admin
            })
            .catch((error) => {
                console.error('Error updating customer details:', error.response || error);
                if (error.response) {
                    console.error('Server Response:', error.response.data);
                    alert(`Failed to update customer details: ${error.response.data.message || 'Unknown error'}`);
                } else {
                    alert('Failed to update customer details.');
                }
            });
    };


    return (
        <div className="adminAddProduct"> {/* Same styling class as AddProduct */}
            <h2>Edit Customer Details</h2>
            <form>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={customer.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={customer.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="button-group">
                    <button className="custom-button" type="button" onClick={handleSave}>
                        Save Changes
                    </button>
                    <button
                        className="custom-button"
                        type="button"
                        onClick={() => navigate('/admin/admin')} // Updated route for navigation
                        style={{ marginTop: '10px' }} // Add some space between the buttons
                    >
                        Go Back to Main Page
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomerDetails;
