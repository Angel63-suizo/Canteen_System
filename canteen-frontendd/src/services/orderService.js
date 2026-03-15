import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  getOrderHistory: async () => {
    return await api.get('/orders/history');
  },

  updateStatus: async (orderId, status) => {
    return await api.patch(`/orders/${orderId}/status`, { status });
  }
};