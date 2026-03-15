import api from './api'; 

export const authService = {
  login: async (credentials) => {    
    const response = await api.post('/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async () => {
    await api.post('/logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => JSON.parse(localStorage.getItem('user')),
};