import axios from "axios";

const BASE_URL = "https://6741af83e4647499008e74a7.mockapi.io/api/v1/user";

export const getUsers = async () => {
  const response = await axios.get(BASE_URL);
  //console.log(response.data);
  return response.data; // Return users
};

export const createUser = async (user) => {
  console.log(user);
  const response = await axios.post(BASE_URL, user);
  console.log(response);
  return response.data; // Return the created user
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${BASE_URL}/${id}`, user);
  return response.data; // Return the updated user
};

export const deleteUserId = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data; // Return confirmation
};
