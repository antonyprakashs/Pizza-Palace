import React, { useState, useEffect } from 'react';
import API from '../axiosConfig'; 
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AdminPizzas() {
  const { token } = useAuth();
  const [pizzas, setPizzas] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const fetchPizzas = async () => {
    try {
      const response = await API.get('/api/pizzas');
      setPizzas(response.data.pizzas);
    } catch (error) {
      console.error('Error loading menu:', error);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('imageUrl', formData.imageUrl);
    if (imageFile) data.append('image', imageFile);

    const apiConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      if (isEditing) {
        await API.put(`/api/pizzas/${editId}`, data, apiConfig);
        toast.success('Pizza updated successfully!');
        handleCancelEdit();
      } else {
        if (!imageFile && !formData.imageUrl.trim()) {
          toast.error('Please upload a file or provide an image web URL!');
          return;
        }
        await API.post('/api/pizzas', data, apiConfig); 
        toast.success('Pizza published successfully!');
        setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' });
        setImageFile(null);
        if (document.getElementById('imageInput')) document.getElementById('imageInput').value = '';
      }
      fetchPizzas();
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Operation failed.');
    }
  };

  const handleEditClick = (pizza) => {
    setIsEditing(true);
    setEditId(pizza._id);
    setFormData({
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      category: pizza.category,
      imageUrl: pizza.imageUrl || ''
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', description: '', price: '', category: '', imageUrl: '' });
    setImageFile(null);
    if (document.getElementById('imageInput')) document.getElementById('imageInput').value = '';
  };

  const handleToggleAvailability = async (id, currentAvailability) => {
    try {
      await API.put(                                   
        `/api/pizzas/${id}`,
        { isAvailable: !currentAvailability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Availability status updated!');
      fetchPizzas();
    } catch (error) {
      toast.error('Could not update status.');
    }
  };

  const handleDeletePizza = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await API.delete(`/api/pizzas/${id}`, {       
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(`${name} removed permanently.`);
        fetchPizzas();
        if (editId === id) handleCancelEdit();
      } catch (error) {
        toast.error('Could not delete item.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-12 max-w-5xl mb-20">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Menu Manager</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 h-fit sticky top-24">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-xl font-bold text-gray-800">
              {isEditing ? 'Edit Pizza Details' : 'Add New Item'}
            </h3>
            {isEditing && (
              <button onClick={handleCancelEdit} className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-wider">
                Cancel
              </button>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block text-gray-700 text-xs font-bold mb-1">Pizza Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 text-sm outline-none font-medium" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 text-sm outline-none font-medium" placeholder="e.g., Combos" required />
              </div>
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1">Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 text-sm outline-none font-bold" required />
              </div>
            </div>

            <div className="space-y-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1">Option A: Upload File</label>
                <input 
                  id="imageInput"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer pt-1"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div>
                <label className="block text-gray-700 text-xs font-bold mb-1">Option B: Image Web URL</label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  className="w-full px-3 py-2 rounded-lg bg-white border border-gray-200 focus:border-red-500 text-xs outline-none font-medium" 
                  placeholder="https://example.com/pizza.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-xs font-bold mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 text-sm outline-none font-medium resize-none" required />
            </div>
            
            <button type="submit" className={`w-full text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow ${isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}>
              {isEditing ? 'Save Changes' : 'Add Pizza'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <h3 className="text-xl font-bold text-gray-800 p-6 border-b">All Pizzas</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4">Pizza Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-medium text-gray-700">
                {pizzas.map((pizza) => (
                  <tr key={pizza._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img src={pizza.imageUrl} alt={pizza.name} className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                      <div>
                        <span className="font-bold text-gray-900 block">{pizza.name}</span>
                        <span className="text-xs text-gray-400 block max-w-xs truncate">{pizza.description}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">{pizza.category}</span>
                    </td>
                    <td className="p-4 font-extrabold text-gray-900">₹{pizza.price}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEditClick(pizza)} className="bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all">Edit</button>
                        <button onClick={() => handleToggleAvailability(pizza._id, pizza.isAvailable ?? true)} className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${ (pizza.isAvailable ?? true) ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100' }`}>{(pizza.isAvailable ?? true) ? 'Visible' : 'Hidden'}</button>
                        <button onClick={() => handleDeletePizza(pizza._id, pizza.name)} className="bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminPizzas;