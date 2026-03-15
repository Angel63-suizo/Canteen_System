import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  const formatPeso = (amount) => `₱${parseFloat(amount || 0).toFixed(2)}`;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        const raw = response.data;
        const processed = {
          ...raw,
          sales_trend: raw.sales_trend.map(item => ({
            ...item,
            revenue: parseFloat(item.revenue) 
          })),
          category_data: raw.category_data.map(item => ({
            ...item,
            value: parseInt(item.value, 10) 
          }))
        };
        setData(processed);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };
    fetchStats();
  }, []);

  if (!data) return <div className="p-8 text-gray-500">Loading dashboard analytics...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Revenue", val: formatPeso(data.total_revenue), icon: DollarSign, color: "text-green-600", bgColor: "bg-green-100" },
          { title: "Total Orders", val: data.total_orders, icon: ShoppingBag, color: "text-blue-600", bgColor: "bg-blue-100" },
          { title: "Avg Order Value", val: formatPeso(data.avg_order_value), icon: TrendingUp, color: "text-orange-600", bgColor: "bg-orange-100" },
          { title: "Today's Orders", val: data.today_orders, icon: Users, color: "text-purple-600", bgColor: "bg-purple-100" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`w-12 h-12 ${stat.bgColor} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Sales Trend</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.sales_trend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(val) => `₱${val}`} />
                <Tooltip formatter={(val) => formatPeso(val)} />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Sales by Category</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.category_data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {data.category_data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Best Selling Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Item</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Qty Sold</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.best_sellers?.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-orange-600">#{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                      {item.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.total_sold}</td>
                  <td className="px-6 py-4 text-right font-bold">{formatPeso(item.price * item.total_sold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;