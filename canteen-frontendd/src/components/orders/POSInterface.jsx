import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuService } from '../../services/menuService';
import { authService } from '../../services/authService';

const POSInterface = () => {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const formatPeso = (amount) => `₱${parseFloat(amount || 0).toFixed(2)}`;

  useEffect(() => {
    menuService.getAll()
      .then(res => setMenu(res.data.filter(item => item.status)))
      .catch(err => console.error("Menu fetch error", err));
  }, []);

  const addToOrder = (item) => {
    setOrder(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, menu_item_id: item.id, quantity: 1 }];
    });
  };

  const removeFromOrder = (id) => {
    setOrder(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = order.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const processOrder = async () => {
    if (order.length === 0) return;

    try {
      const orderData = { 
        items: order.map(item => ({
            menu_item_id: item.menu_item_id,
            quantity: item.quantity
        })), 
        total: total 
      };
      
      await menuService.createOrder(orderData);
      
      alert('Order saved to database!');
      setOrder([]); 
    } catch (err) {
      console.error("Order error:", err);
      const errorMessage = err.response?.data?.message || 'Failed to place order';
      alert(errorMessage);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 p-6 gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {menu.map(item => (
            <div 
              key={item.id} 
              onClick={() => addToOrder(item)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-orange-500 transition"
            >
              <div className="h-20 bg-orange-50 rounded-lg mb-3 flex items-center justify-center text-3xl">🍽️</div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-orange-500 font-bold">{formatPeso(item.price)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[300px] self-start">
        <h2 className="text-xl font-bold mb-4">Current Order</h2>
        
        <div className="flex-grow overflow-y-auto pr-2">
          {order.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No items in cart</p>
          ) : (
            order.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center mb-4 text-sm">
                <div className="flex flex-col">
                  <span className="font-medium">{item.name} (x{item.quantity})</span>
                  <button onClick={() => removeFromOrder(item.id)} className="text-red-400 text-xs w-fit hover:underline">
                    Remove
                  </button>
                </div>
                <span className="font-bold">{formatPeso(item.price * item.quantity)}</span>
              </div>
            ))
          )}
        </div>
        
        <div className="border-t pt-4 mt-4 flex-shrink-0">
          <div className="flex justify-between text-sm mb-2"><span>Subtotal</span><span>{formatPeso(subtotal)}</span></div>
          <div className="flex justify-between text-sm mb-2"><span>Tax (8%)</span><span>{formatPeso(tax)}</span></div>
          <div className="flex justify-between text-lg font-bold mb-6"><span>Total</span><span className="text-orange-600">{formatPeso(total)}</span></div>
          <button 
            onClick={processOrder}
            disabled={order.length === 0}
            className="w-full bg-orange-400 text-white py-3 rounded-lg font-bold hover:bg-orange-500 disabled:bg-gray-300 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSInterface;