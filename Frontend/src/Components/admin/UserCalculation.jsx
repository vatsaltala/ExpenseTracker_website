import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UserCalculation.css';

const UserCalculation = () => {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) {
                setError("No user ID provided");
                return;
            }

            setLoading(true);
            try {
                const userRes = await axios.get(`http://localhost:3000/user/getuser/${userId}`);
                setUserDetails(userRes.data.data);

                const [incomeRes, expenseRes] = await Promise.all([
                    axios.get(`http://localhost:3000/income/getincomesbyuser/${userId}`),
                    axios.get(`http://localhost:3000/expense/getexpensesbyuser/${userId}`)
                ]);
                
                setIncome(incomeRes.data.data);
                setExpenses(expenseRes.data.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const totalIncome = income.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);
    const netBalance = totalIncome - totalExpenses;

    const handleBackClick = () => {
        navigate('/admin/userdetails');
    };

    return (
        <div className="history-container">
            <button onClick={handleBackClick} className="back-btn">
                ← Back to Users
            </button>
            
            <h1>Financial Summary</h1>
            {userDetails && (
                <h2>
                    User: {userDetails.firstname} {userDetails.lastname} (ID: {userId})
                </h2>
            )}
            
            {loading && <p>Loading financial data...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="summary-boxes">
                <div className="summary-box income-box">
                    <h2>Total Income</h2>
                    <p>${totalIncome.toFixed(2)}</p>
                </div>

                <div className="summary-box expense-box">
                    <h2>Total Expenses</h2>
                    <p>${totalExpenses.toFixed(2)}</p>
                </div>

                <div className="summary-box balance-box">
                    <h2>Net Balance</h2>
                    <p>${netBalance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default UserCalculation;