import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const CustomerDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/menu', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      setItems(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching menu:", err);
      setLoading(false);
    });
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  if (loading) return <div className="p-8">Loading menu...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Menu</h1>
          <p className="text-gray-500 mt-1">Order your favorite food</p>
        </div>
        
        <button 
          onClick={() => navigate('/customer/orders')} 
          className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-orange-700 transition shadow-lg shadow-orange-200"
        >
          <span>🛒 Cart ({cart.length})</span>
          <span className="bg-orange-500 px-3 py-1 rounded-lg text-sm">₱{cartTotal}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-40 bg-orange-50 rounded-xl mb-4 flex items-center justify-center text-5xl">🍴</div>
            <h2 className="font-bold text-lg text-gray-900">{item.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{item.description}</p>
            <div className="flex justify-between items-center mt-6">
              <p className="text-orange-600 font-bold text-xl">₱{parseFloat(item.price).toFixed(2)}</p>
            </div>
            <button 
              onClick={() => addToCart(item)}
              className="mt-4 w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
            >
              + Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;