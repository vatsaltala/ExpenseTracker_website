import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './History.css'; // Import the CSS file

const History = () => {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasUserClickedHistory, setHasUserClickedHistory] = useState(false); // Track user interaction

    // Fetch income and expense data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const userid=localStorage.getItem("id")
            try {
                const incomeRes = await axios.get(`http://localhost:3000/income/getincomesbyuser/${userid}`);
                const expenseRes = await axios.get(`http://localhost:3000/expense/getexpensesbyuser/${userid}`);
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
    }, []);

    // Calculate total income
    const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    // Calculate net balance
    const netBalance = totalIncome - totalExpenses;

  
    const handleHistoryClick = () => {
        setHasUserClickedHistory(true); // Set the state to true when the user clicks the link
    };

    return (
        <div className="history-container">
            <h1>Financial Summary</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="summary-boxes">
                {/* Total Income Box */}
                <div className="summary-box income-box">
                    <h2>Total Income</h2>
                    <p>${totalIncome.toFixed(2)}</p>
                </div>

                {/* Total Expenses Box */}
                <div className="summary-box expense-box">
                    <h2>Total Expenses</h2>
                    <p>${totalExpenses.toFixed(2)}</p>
                </div>

                {/* Net Balance Box */}
                <div className="summary-box balance-box">
                    <h2>Net Balance</h2>
                    <p>${netBalance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default History;