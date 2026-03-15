import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    
    name: '',
    price: '',
    category_id: '',
    status: true,
    stock_quantity: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    const res = await menuService.getAll();
    setItems(res.data);
  };

  const fetchCategories = async () => {
    const res = await menuService.getCategories();
    setCategories(res.data);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || String(item.category_id) === String(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      stock_quantity: item.stock_quantity,
      category_id: item.category_id,
      status: item.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      await menuService.delete(id);
      fetchItems();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await menuService.update(editingItem.id, formData);
      } else {
        await menuService.create(formData);
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({ name: '', price: '', category_id: '', status: true, stock_quantity: '' });
      fetchItems();
    } catch (error) {

      console.error("Save error:", error.response?.data || error);
      alert("Could not save item.");
    }
  };

  const handleToggle = async (id) => {
    await menuService.toggleStatus(id);
    fetchItems();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button
          onClick={() => { setEditingItem(null); setFormData({name: '', price: '', category_id: '', status: true, stock_quantity: ''}); setShowModal(true); }}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition">

          + Add New Item
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Search items..." className="border p-2 rounded-lg w-full" onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="border p-2 rounded-lg" onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input className="w-full border border-gray-300 p-3 rounded-lg" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                  <input className="w-full border border-gray-300 p-3 rounded-lg" type="number" step="0.01" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input className="w-full border border-gray-300 p-3 rounded-lg" type="number" value={formData.stock_quantity || ''} onChange={e => setFormData({...formData, stock_quantity: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border border-gray-300 p-3 rounded-lg bg-white" onChange={e => setFormData({...formData, category_id: e.target.value})} value={formData.category_id || ''} required>
                  <option value="">Select a category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-lg">{editingItem ? 'Update Item' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold">{item.name}</h3>
            <div className="flex justify-between items-center mt-4">
                <span className="text-orange-600 font-bold text-lg">₱{item.price}</span>
                <div className="flex gap-2">
                    <button onClick={() => handleEditClick(item)} className="text-blue-500 text-sm hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm hover:underline">Delete</button>
                </div>
                <button onClick={() => handleToggle(item.id)} className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {item.status ? 'Available' : 'Unavailable'}
                </button>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;