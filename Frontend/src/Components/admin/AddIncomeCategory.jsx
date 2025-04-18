// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import './AddIncomeCategory.css';

// const AddIncomeCategory = () => {
//   const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
//   const [categories, setCategories] = useState([]);
//   const [editingIncomeCategory, setEditingIncomeCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:3000/incomecategory/getincomecategories');
//       setCategories(res.data.data || []);
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       if (editingIncomeCategory) {
//         await axios.put(`http://localhost:3000/incomecategory/updateincomecategory/${editingIncomeCategory._id}`, {
//           category: data.category,
//         });
//         setEditingIncomeCategory(null);
//       } else {
//         await axios.post('http://localhost:3000/incomecategory/addincomecategory', {
//           incomecategory: data.incomecategory,
//         });
//       }
//       reset();
//       fetchCategories();
//     } catch (err) {
//       console.error('Error submitting incomecategory:', err);
//       alert("Error while submitting incomecategory. See console for details.");
//     }
//   };

//   const handleEdit = (cat) => {
//     setEditingIncomeCategory(cat);
//     setValue('category', cat.category);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/incomecategory/deleteincomecategory/${id}`);
//       fetchCategories();
//     } catch (err) {
//       console.error('Error deleting incomecategory:', err);
//     }
//   };

//   return (
//     <>
//       <div className="add-expense-container">
//         <h1>{editingIncomeCategory ? 'Edit IncomeCategory' : 'Add IncomeCategory'}</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group">
//             <label>Category:</label>
//             <input
//               type="text"
//               {...register('category', { required: 'IncomeCategory is required' })}
//               placeholder="Enter incomecategory"
//             />
//             {errors.category && <span className="error-message">{errors.category.message}</span>}
//           </div>
//           <div className="form-group">
//             <input type="submit" value={editingIncomeCategory ? 'Update IncomeCategory' : 'Add IncomeCategory'} />
//             {editingIncomeCategory && (
//               <button
//                 className="cancel-button"
//                 type="button"
//                 onClick={() => {
//                   reset();
//                   setEditingIncomeCategory(null);
//                 }}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       <div className="expense-table-container">
//         <h2>All Categories</h2>
//         <table className="expense-table">
//           <thead>
//             <tr>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {categories.map((cat, idx) => (
//               <tr key={idx}>
//                 <td>{cat.category}</td>
//                 <td>
//                   <button className="update-button" onClick={() => handleEdit(cat)}>Update</button>
//                   <button className="delete-button" onClick={() => handleDelete(cat._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default AddIncomeCategory;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AddIncomeCategory.css';

const AddIncomeCategory = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/incomecategory/getincomecategories');
      setCategories(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:3000/incomecategory/updateincomecategory/${editingCategory._id}`, {
          category: data.category,
        });
        setEditingCategory(null);
      } else {
        await axios.post('http://localhost:3000/incomecategory/addincomecategory', {
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
      await axios.delete(`http://localhost:3000/incomecategory/deleteincomecategory/${id}`);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <>
      <div className="add-expense-container">
        <h1>{editingCategory ? 'Edit Income Category' : 'Add Income Category'}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              {...register('category', { required: 'Category is required' })}
              placeholder="Enter category name"
            />
            {errors.category && (
              <span className="error-message">{errors.category.message}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="submit"
              value={editingCategory ? 'Update Category' : 'Add Category'}
            />
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
        <h2>All Income Categories</h2>
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

export default AddIncomeCategory;
