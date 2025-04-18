import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './AddExpense.css'; // Import the CSS file

const AddExpense = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [expense, setExpense] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null); // State to track the expense being edited
    const [userId, setUserId] = useState(null);
    const [categories, setCategories] = useState([])

    // Get userid from localStorage when component mounts
    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            setUserId(id);
            // Fetch user's expenses automatically when component mounts
            fetchExpensesByUserId(id);
            getcategory()
        }
    }, []);

    // Function to handle adding a new expense
    const handle = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/expense/addexpense", {
                ...data,
                userid: userId
            });
            console.log(res.data);
            setError(null);
            alert("Expense added successfully!");
            fetchExpensesByUserId(userId); // Refresh the list with only this user's expenses
            reset();
        } catch (err) {
            setError("Failed to add expense. Please try again.");
            console.error(err);
        }
    };

    // Function to fetch expenses for the logged-in user only
    const fetchExpensesByUserId = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/expense/getexpensesbyuser/${id}`);
            console.log(res.data);
            setExpense(res.data.data); // Ensure the response has a 'data' field
            setError(null);
        } catch (err) {
            setError("Failed to fetch expenses. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle deleting an expense
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/expense/deleteexpense/${id}`);
            console.log(res.data);
            alert("Expense deleted successfully!");
            fetchExpensesByUserId(userId); // Refresh the expense list after deleting
        } catch (err) {
            setError("Failed to delete expense. Please try again.");
            console.error(err);
        }
    };

    // Function to handle updating an expense
    const handleUpdate = async (id, updatedData) => {
        try {
            const res = await axios.put(`http://localhost:3000/expense/updateexpense/${id}`, updatedData);
            console.log(res.data);
            alert("Expense updated successfully!");
            fetchExpensesByUserId(userId); // Refresh the expense list after updating
            setEditingExpense(null); // Close the edit form after updating
        } catch (err) {
            setError("Failed to update expense. Please try again.");
            console.error(err);
        }
    };

    // Function to open the edit form with the selected expense data
    const openEditForm = (expense) => {
        setEditingExpense(expense); // Set the expense being edited
        reset(expense); // Pre-fill the form with the expense data
    };

    // Validator for form fields
    const validator = {
        titlevalidator: {
            required: {
                value: true,
                message: "Please enter a Title"
            }
        },
        descriptionvalidator: {
            required: {
                value: true,
                message: "Please enter description"
            }
        },
        amountvalidator: {
            required: {
                value: true,
                message: "Please enter an amount"
            }
        },
        transactionvalidator: {
            required: {
                value: true,
                message: "Please enter a transaction date"
            }
        },
        categoryvalidator: {
            required: {
                value: true,
                message: "Please select a category"
            }
        }
    };
    const getcategory=async()=>{

        // ["Food", "Education", "Travel", "Grocery", "Fashion", "Electronics", "Bills"]
        const catres = await axios.get(`http://localhost:3000/category/getcategories`)    
        console.log(catres)
        setCategories(catres.data.data)
    }
   

    return (
        <>
            <div className="add-expense-container">
                <h1>{editingExpense ? "Edit Expense" : "Add Expense Form"}</h1>
                <form onSubmit={handleSubmit(editingExpense ? (data) => handleUpdate(editingExpense._id, data) : handle)}>
                    
                    <div className="form-group">
                        <label>Category:</label>
                        <select {...register("category", validator.categoryvalidator)}>
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.category}>{category.category}</option>
                            ))}
                        </select>
                        <span className="error-message">
                            {errors.category?.message}
                        </span>
                    </div>
                    
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" placeholder="Enter expense title" {...register("title", validator.titlevalidator)} />
                        <span className="error-message">
                            {errors.title?.message}
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Description:</label>
                        <input type="textarea" placeholder="Enter a description" {...register("description", validator.descriptionvalidator)} />
                        <span className="error-message">
                            {errors.description?.message}
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="number" placeholder="Enter a price" {...register("amount", validator.amountvalidator)} />
                        <span className="error-message">
                            {errors.amount?.message}
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Transaction Date:</label>
                        <input type="date" {...register("transactiondate", validator.transactionvalidator)} />
                        <span className="error-message">
                            {errors.transactiondate?.message}
                        </span>
                    </div>

                    <div className="form-group">
                        <input type="submit" value={editingExpense ? "Update Expense" : "Add Expense"} className="submit-button" />
                        {editingExpense && (
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setEditingExpense(null)} // Cancel editing
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="expense-table-container">
                <button onClick={() => fetchExpensesByUserId(userId)} disabled={loading || !userId} className="fetch-button">
                    {loading ? "Loading..." : "Fetch My Expenses"}
                </button>
                {error && <p className="error-message">{error}</p>}
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Category</th> 
                            <th>Title</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Transaction Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expense.map((ex, index) => (
                            <tr key={index}>
                                <td>{ex.category}</td> 
                                <td>{ex.title}</td>
                                <td>{ex.description}</td>
                                <td>{ex.amount}</td>
                                <td>{new Date(ex.transactiondate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="update-button"
                                        onClick={() => openEditForm(ex)} // Open edit form with expense data
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(ex._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AddExpense;