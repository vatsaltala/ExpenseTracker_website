import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDetail.css';

const UserDetail = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchuserdata = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token"); // get the token
          const userres = await axios.get("http://localhost:3000/user/getallusers", {
            headers: {
              Authorization: `Bearer ${token}`, // pass the token here
            },
          });
          setUsers(userres.data.data);
          setError(null);
        } catch (e) {
          setError("Failed to fetch users. Please try again.");
          console.error("Error fetching users:", e);
        } finally {
          setLoading(false);
        }
      };
      
    

    useEffect(() => {
        fetchuserdata();
    }, []);

    const handleDataClick = (userId) => {
        navigate(`/admin/calculation/${userId}`);
    };

    const handleDataClick1 = (userId) => {
        navigate(`/admin/userchart/user/${userId}`);
    };


    return (
        <div className="user-detail-container">
            <div className="user-detail-header">
                <h1>User Management</h1>
                <p className="subtitle">View and manage all registered users</p>
            </div>
            
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                </div>
            )}
            
            {error && (
                <div className="error-alert">
                    <p>{error}</p>
                </div>
            )}
            
            <div className="user-table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.lastname}</td>
                                <td>{user.firstname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <button 
                                        className="view-data-btn"
                                        onClick={() => handleDataClick(user._id)}
                                        disabled={loading}
                                    >
                                        View Financial Data
                                        <span className="btn-icon">→</span>
                                    </button>
                                </td>
                                {/* <td>
                                    <button 
                                        className="view-data-btn"
                                        onClick={() => handleDataClick1(user._id)}
                                        disabled={loading}
                                    >
                                        view chart
                                        <span className="btn-icon">→</span>
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetail;