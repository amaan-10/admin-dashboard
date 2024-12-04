import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/user`);
  //console.log(response.data);
  return response.data; // Return users
};

export const createUser = async (user) => {
  //console.log(user);
  const response = await axios.post(`${BASE_URL}/user`, user);
  //console.log(response);
  return response.data; // Return the created user
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${BASE_URL}/user/${id}`, user);
  return response.data; // Return the updated user
};

export const deleteUserId = async (id) => {
  const response = await axios.delete(`${BASE_URL}/user/${id}`);
  return response.data; // Return confirmation
};

export const getCredentials = async () => {
  const response = await axios.get(`${BASE_URL}/auth`);
  //console.log(response.data);
  return response.data; // Return users
};

export const setCredentials = async (credentials) => {
  //console.log(credentials);
  const response = await axios.post(`${BASE_URL}/auth`, credentials);
  //console.log(response);
  return response.data; // Return the created user
};
