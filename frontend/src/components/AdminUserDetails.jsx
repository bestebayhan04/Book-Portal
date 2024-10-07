import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../comp_css/AdminUserDetails.css';
import api from '../Router/api';

function AdminUserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();  // Hook to navigate to different routes

    useEffect(() => {
        api
            .get('/ecom/customers/get-all-customer')
            .then((response) => {
                // Sort addresses for each user by timestamp in descending order
                const sortedUsers = response.data.map((user) => ({
                    ...user,
                    address: user.address.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
                }));
                setUsers(sortedUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Function to get the latest address for a user
    const getLatestAddress = (user) => {
        const addresses = user.address;
        if (addresses && addresses.length > 0) {
            const latestAddress = addresses[0];
            return (
                <div>
                    <h3>Latest Address</h3>
                    <p>Flat No: {latestAddress.flatNo}</p>
                    <p>Street: {latestAddress.street}</p>
                    <p>City: {latestAddress.city}</p>
                    <p>State: {latestAddress.state}</p>
                    <p>Zip Code: {latestAddress.zipCode}</p>
                </div>
            );
        } else {
            return <p>No address available</p>;
        }
    };

    // Function to handle the deletion of a user
    const deleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            api
                .delete(`/ecom/customers/delete/${userId}`)
                .then(() => {
                    setUsers(users.filter(user => user.userId !== userId));
                    alert('User deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user');
                });
        }
    };

    return (
        <div className="admin-users">
            {loading ? (
                <p>Loading...</p>
            ) : (
                users.map((user) => (
                    <div className="user-card" key={user.userId}>
                        <div className="user-info">
                            <h3>User Details</h3>
                            <p>User ID: {user.userId}</p>
                            <p>Email: {user.email}</p>
                            <p>Name: {user.firstName} {user.lastName}</p>
                            <p>Phone Number: {user.phoneNumber}</p>
                            <p>Register Time: {user.registerTime}</p>
                            <p>User Account Status: {user.userAccountStatus}</p>
                        </div>
                        <div className="user-address">
                            {getLatestAddress(user)}
                        </div>
                        <div className="user-actions">
                            <button
                                onClick={() => navigate(`/admin/edit-customer/${user.userId}`)}
                                className="edit-button"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteUser(user.userId)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default AdminUserDetails;
