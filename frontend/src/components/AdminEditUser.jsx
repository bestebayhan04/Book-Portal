import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Router/api';
import '../comp_css/AdminEditUser.css';

const AdminEditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        api.get(`/ecom/customers/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, [userId]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`/ecom/customers/update/${userId}`, user)
            .then(() => {
                alert('User details updated successfully');
                navigate('/admin/view-all-users');
            })
            .catch(error => {
                console.error('Error updating user details:', error);
                alert('Failed to update user details');
            });
    };

    return (
        <div className="edit-user-page">
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit} className="edit-user-form">
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        disabled
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
            <button onClick={() => navigate('/admin/view-all-users')} className="back-button">
                Go Back to Users List
            </button>
        </div>
    );
};

export default AdminEditUser;
