// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getUsers() {
    return apiClient.get('/users');
  },
  createUser(user) {
    return apiClient.post('/users', user);
  }
};
