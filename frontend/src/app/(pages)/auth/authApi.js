"use client";
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Function to handle API requests
const handleRequest = async (url, method = "POST", body = null) => {
  console.log(apiUrl);

  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Allows sending cookies with cross-origin requests
  };

  try {
    const response = await axios({
      url,
      method,
      data: body, // Axios automatically stringifies the body
      ...requestOptions,
    });
    console.log(response,"resposne")
    return response.data; // Return the response data directly
  } catch (error) {
    console.error(`Error in ${method} request:`, error);
    throw error;
  }
};

// Register user
export const registerUser = async (userData) => {
  const url = `${apiUrl}/users/signUp`;
  console.log(url, "register URL");
  return await handleRequest(url, "POST", userData);
};

// Login user
export const loginUser = async (userData) => {
  const url = `${apiUrl}/users/login`;
  console.log(url, "login URL");
  return await handleRequest(url, "POST", userData);
};

// Logout user
export const logoutUser = async () => {
  const url = `${apiUrl}/users/logout`;
  return await handleRequest(url, "GET"); // Assuming logout is a GET request
};

// Authenticate user 
export const authenticateUser = async () => {
  const url = `${apiUrl}/users/refresh-token`;
  return await handleRequest(url, "GET"); // Assuming refresh-token is a GET request
};
