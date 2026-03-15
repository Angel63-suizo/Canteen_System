import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

const OrderHistory = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [history, setHistory] = useState([]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + (price * quantity);
  }, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Fetch history from backend
  const fetchHistory = () => {
    axios.get('/api/customer/orders/history', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setHistory(res.data))
    .catch(console.error);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCheckout = async () => {
    try {
      const payload = { 
        items: cart.map(i => ({ 
          menu_item_id: i.id, 
          quantity: Number(i.quantity) || 1 
        })) 
      };

      await axios.post('/api/customer/orders', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      alert("Order placed successfully!");
      if (typeof clearCart === 'function') clearCart();
      fetchHistory(); // Refresh history list
    } catch (error) {
      console.error("Backend Error Details:", error.response?.data);
      alert(error.response?.data?.message || "Checkout failed.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">🛒 Current Cart</h2>
          {cart.length === 0 ? <p className="text-gray-500">Your cart is empty.</p> : (
            <>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-500">₱{parseFloat(item.price || 0).toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 font-bold">-</button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 font-bold">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">🗑️</button>
                  </div>
                </div>
              ))}
              <div className="space-y-2 mt-4 text-gray-600">
                <div className="flex justify-between"><span>Subtotal</span><span>₱{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (8%)</span><span>₱{tax.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-xl text-black">
                  <span>Total</span><span className="text-orange-600">₱{total.toFixed(2)}</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="w-full bg-orange-600 text-white py-3 rounded-xl mt-6 font-bold hover:bg-orange-700">Proceed to Checkout</button>
            </>
          )}
        </div>

        {/* Status Guide */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <h2 className="font-bold mb-4">Order Status Guide</h2>
          <div className="space-y-4 text-sm text-gray-600">
            <p>🟡 <strong>Pending</strong>: Waiting</p>
            <p>🔵 <strong>Preparing</strong>: In progress</p>
            <p>🟢 <strong>Ready</strong>: For pickup</p>
          </div>
        </div>
      </div>

      {/* History Section */}
      
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">Order History</h2>
          <button onClick={fetchHistory} className="text-sm text-orange-600 font-bold">Refresh</button>
        </div>

        {history.length === 0 ? <p className="text-slate-500 text-center py-12">No orders found.</p> : (
          <div className="space-y-4">
            {history.map(order => (
              <div key={order.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-xs font-mono text-slate-400">{order.order_number}</span>
                  <p className="font-bold text-slate-800">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-lg font-bold text-slate-900">₱{parseFloat(order.total || 0).toFixed(2)}</p>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                  order.status === 'Ready' ? 'bg-green-100 text-green-700' : 
                  order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;