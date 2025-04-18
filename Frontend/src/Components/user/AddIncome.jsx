import React, { useState, useEffect } from 'react';
import { get, useForm } from 'react-hook-form';
import axios from 'axios';
import './AddIncome.css'; // Import the CSS file

const AddIncome = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [income, setIncome] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingIncome, setEditingIncome] = useState(null); // State to track the income being edited
    const [userId, setUserId] = useState(null);
    const [categories, setCategories] = useState([]); 

    // Get userid from localStorage when component mounts
    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            setUserId(id);
            // Fetch user's incomes automatically when component mounts
            fetchIncomesByUserId(id);
            getcategories(); 
        }
    }, []);

    // Function to handle adding a new income
    const handle = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/income/addincome", {
                ...data,
                userid: userId
            });
            console.log(res.data);
            setError(null);
            alert("Income added successfully!");
            fetchIncomesByUserId(userId); 
            reset();
        } catch (err) {
            setError("Failed to add income. Please try again.");
            console.error(err);
        }
    };

    // Function to fetch incomes for the logged-in user only
    const fetchIncomesByUserId = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:3000/income/getincomesbyuser/${id}`);
            console.log(res.data);
            setIncome(res.data.data); // Ensure the response has a 'data' field
            setError(null);
        } catch (err) {
            setError("Failed to fetch incomes. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle deleting an income
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/income/deleteincome/${id}`);
            console.log(res.data);
            alert("Income deleted successfully!");
            fetchIncomesByUserId(userId); // Refresh the income list after deleting
        } catch (err) {
            setError("Failed to delete income. Please try again.");
            console.error(err);
        }
    };

    // Function to handle updating an income
    const handleUpdate = async (id, updatedData) => {
        try {
            const res = await axios.put(`http://localhost:3000/income/updateincome/${id}`, updatedData);
            console.log(res.data);
            alert("Income updated successfully!");
            fetchIncomesByUserId(userId); // Refresh the income list after updating
            setEditingIncome(null); // Close the edit form after updating
        } catch (err) {
            setError("Failed to update income. Please try again.");
            console.error(err);
        }
    };

    // Function to open the edit form with the selected income data
    const openEditForm = (income) => {
        setEditingIncome(income); // Set the income being edited
        reset(income); // Pre-fill the form with the income data
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

    const getcategories =async()=>{
        try {
            const ires = await axios.get("http://localhost:3000/incomecategory/getincomecategories");
            console.log(ires);
            setCategories(ires.data.data);
        } catch (err) {
            setError("Failed to fetch categories. Please try again.");
            console.error(err);
        }

    }

    return (
        <>
            <div className="add-income-container">
                <h1>{editingIncome ? "Edit Income" : "Add Income Form"}</h1>
                <form onSubmit={handleSubmit(editingIncome ? (data) => handleUpdate(editingIncome._id, data) : handle)}>
                    
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
                        <input type="text" placeholder="Enter income title" {...register("title", validator.titlevalidator)} />
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
                        <input type="submit" value={editingIncome ? "Update Income" : "Add Income"} className="submit-button" />
                        {editingIncome && (
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setEditingIncome(null)} // Cancel editing
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="income-table-container">
                <button onClick={() => fetchIncomesByUserId(userId)} disabled={loading || !userId} className="fetch-button">
                    {loading ? "Loading..." : "Fetch My Incomes"}
                </button>
                {error && <p className="error-message">{error}</p>}
                <table className="income-table">
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
                        {income.map((ex, index) => (
                            <tr key={index}>
                                <td>{ex.category}</td> 
                                <td>{ex.title}</td>
                                <td>{ex.description}</td>
                                <td>{ex.amount}</td>
                                <td>{new Date(ex.transactiondate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="update-button"
                                        onClick={() => openEditForm(ex)} // Open edit form with income data
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

export default AddIncome;