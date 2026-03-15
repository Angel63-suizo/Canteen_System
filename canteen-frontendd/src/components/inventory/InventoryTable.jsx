import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [tempValue, setTempValue] = useState(0);

    // Consistent currency helper
    const formatPeso = (amount) => `₱${parseFloat(amount || 0).toFixed(2)}`;

    const fetchInventory = async () => {
        try {
            const { data } = await api.get('/inventory');
            setItems(data);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    const adjustStock = async (id, amount) => {
        try {
            await api.patch(`/inventory/${id}/update`, { 
                quantity_change: amount, 
                reason: 'Manual adjustment' 
            });
            fetchInventory();
            setEditingId(null);
        } catch (error) {
            alert("Error updating stock: " + (error.response?.data?.message || "Failed"));
        }
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setTempValue(item.stock_quantity);
    };

    useEffect(() => { fetchInventory(); }, []);

    const lowStockItems = items.filter(i => i.stock_quantity < 20);
    const outOfStock = items.filter(i => i.stock_quantity === 0);
    const totalValue = items.reduce((sum, item) => sum + (parseFloat(item.price || 0) * item.stock_quantity), 0);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-6 bg-white rounded-2xl border shadow-sm">
                    <p className="text-gray-500 text-sm">Low Stock Items</p>
                    <h2 className="text-3xl font-bold text-red-600">{lowStockItems.length}</h2>
                </div>
                <div className="p-6 bg-white rounded-2xl border shadow-sm">
                    <p className="text-gray-500 text-sm">Out of Stock</p>
                    <h2 className="text-3xl font-bold text-orange-600">{outOfStock.length}</h2>
                </div>
                <div className="p-6 bg-white rounded-2xl border shadow-sm">
                    <p className="text-gray-500 text-sm">Total Inventory Value</p>
                    <h2 className="text-3xl font-bold text-green-600">{formatPeso(totalValue)}</h2>
                </div>
            </div>

            <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4">Item</th>
                            <th className="p-4">Stock Level</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Value</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-t hover:bg-gray-50 transition">
                                <td className="p-4 font-medium">{item.name}</td>
                                <td className="p-4">{item.stock_quantity} units</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${item.stock_quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {item.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
                                    </span>
                                </td>
                                <td className="p-4">{formatPeso(parseFloat(item.price || 0) * item.stock_quantity)}</td>
                                <td className="p-4 flex gap-2 items-center">
                                    {editingId === item.id ? (
                                        <>
                                            <input 
                                                type="number"
                                                value={tempValue}
                                                onChange={(e) => setTempValue(e.target.value)}
                                                className="w-20 p-1 border rounded text-sm"
                                            />
                                            <button 
                                                onClick={() => adjustStock(item.id, parseInt(tempValue) - item.stock_quantity)}
                                                className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                            >Save</button>
                                            <button 
                                                onClick={() => setEditingId(null)}
                                                className="bg-gray-300 text-white px-3 py-1 rounded text-sm hover:bg-gray-400"
                                            >Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={() => startEditing(item)}
                                                className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-sm hover:bg-blue-100"
                                            >Adjust</button>
                                            <button 
                                                onClick={() => adjustStock(item.id, 50)} 
                                                className="text-green-600 bg-green-50 px-3 py-1 rounded-lg text-sm hover:bg-green-100"
                                            >+50</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;