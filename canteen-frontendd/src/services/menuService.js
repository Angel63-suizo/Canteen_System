import api from './api';

export const menuService = {
  getAll: () => api.get('/menu'),
  create: (itemData) => api.post('/menu', itemData),
  update: (id, itemData) => api.put(`/menu/${id}`, itemData),
  delete: (id) => api.delete(`/menu/${id}`),
  toggleStatus: (id) => api.patch(`/menu/${id}/toggle`), 
  getCategories: () => api.get('/categories'),
  createOrder: (data) => api.post('/orders', data),
};