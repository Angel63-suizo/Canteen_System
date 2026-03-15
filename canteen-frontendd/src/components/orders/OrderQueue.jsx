import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const OrderQueue = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('All');

    // Consistent currency helper
    const formatPeso = (amount) => `₱${parseFloat(amount || 0).toFixed(2)}`;

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const filteredOrders = activeTab === 'All' 
        ? orders 
        : orders.filter(order => order.status === activeTab);

    const handleStatusUpdate = async (id, currentStatus) => {
        const transitions = { 'Pending': 'Preparing', 'Preparing': 'Ready', 'Ready': 'Completed' };
        const nextStatus = transitions[currentStatus];
        if (!nextStatus) return;

        // Optimistic UI update
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextStatus } : o));

        try {
            await api.patch(`/orders/${id}/status`, { status: nextStatus });
        } catch (error) {
            fetchOrders(); // Rollback if failed
            alert("Failed to update status.");
        }
    };

    const getButtonConfig = (status) => {
        if (status === 'Pending') return { label: 'Start Preparing', style: 'bg-orange-600' };
        if (status === 'Preparing') return { label: 'Mark as Ready', style: 'bg-blue-600' };
        if (status === 'Ready') return { label: 'Complete Order', style: 'bg-green-600' };
        return null;
    };

    if (loading) return <div className="p-8">Loading queue...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Order Queue</h1>
            
            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {['All', 'Pending', 'Preparing', 'Ready', 'Completed'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === tab ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>
                        {tab} ({tab === 'All' ? orders.length : orders.filter(o => o.status === tab).length})
                    </button>
                ))}
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map(order => {
                    const btn = getButtonConfig(order.status);
                    return (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg font-mono">{order.order_number}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                    order.status === 'Ready' ? 'bg-green-100 text-green-700' : 
                                    order.status === 'Preparing' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                }`}>{order.status}</span>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                {order.order_items?.map((item, idx) => (
                                    <p key={idx} className="text-sm text-gray-700">
                                        {item.quantity}x {item.menu_item?.name || 'Item'}
                                    </p>
                                ))}
                            </div>
                            
                            <div className="border-t pt-4">
                                <p className="text-right font-bold mb-4">{formatPeso(order.total)}</p>
                                {btn && (
                                    <button onClick={() => handleStatusUpdate(order.id, order.status)}
                                        className={`w-full text-white py-2 rounded-lg transition ${btn.style} hover:opacity-90`}>
                                        {btn.label}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderQueue;