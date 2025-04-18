import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AddCategory.css';

const AddCategory = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/category/getcategories');
      setCategories(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:3000/category/updatecategory/${editingCategory._id}`, {
          category: data.category,
        });
        setEditingCategory(null);
      } else {
        await axios.post('http://localhost:3000/category/addcategory', {
          category: data.category,
        });
      }
      reset();
      fetchCategories();
    } catch (err) {
      console.error('Error submitting category:', err);
      alert("Error while submitting category. See console for details.");
    }
  };

  const handleEdit = (cat) => {
    setEditingCategory(cat);
    setValue('category', cat.category);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/category/deletecategory/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <>
      <div className="add-expense-container">
        <h1>{editingCategory ? 'Edit Category' : 'Add Category'}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              {...register('category', { required: 'Category is required' })}
              placeholder="Enter category"
            />
            {errors.category && <span className="error-message">{errors.category.message}</span>}
          </div>
          <div className="form-group">
            <input type="submit" value={editingCategory ? 'Update Category' : 'Add Category'} />
            {editingCategory && (
              <button
                className="cancel-button"
                type="button"
                onClick={() => {
                  reset();
                  setEditingCategory(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="expense-table-container">
        <h2>All Categories</h2>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={idx}>
                <td>{cat.category}</td>
                <td>
                  <button className="update-button" onClick={() => handleEdit(cat)}>Update</button>
                  <button className="delete-button" onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddCategory;
