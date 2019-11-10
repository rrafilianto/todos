import axios from 'axios';
import { BASE_URL } from '../constants/endpoint-const';
import auth from './authentication-service';

const headers = { Authorization: `${auth.getToken()}` };

export const apiLogin = reqBody => {
  return axios.post(`${BASE_URL}/auth/login`, reqBody);
};

export const apiRegister = reqBody => {
  return axios.post(`${BASE_URL}/auth/register`, reqBody);
};

export const apiTodoList = params => {
  return axios.get(`${BASE_URL}/todo/user`, { params, headers });
};

export const apiTodoCreate = reqBody => {
  return axios.post(`${BASE_URL}/todo`, reqBody, { headers });
};

export const apiTodoDetail = id => {
  return axios.get(`${BASE_URL}/todo/${id}`, { headers });
};

export const apiTodoEdit = (id, reqBody) => {
  return axios.put(`${BASE_URL}/todo/${id}`, reqBody, { headers });
};

export const apiTodoDelete = id => {
  return axios.delete(`${BASE_URL}/todo/${id}`, { headers });
};
