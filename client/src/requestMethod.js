import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

// const token = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).accessToken

// console.log(JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).accessToken)

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    // token:`Bearer ${token}`
  },
});

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
