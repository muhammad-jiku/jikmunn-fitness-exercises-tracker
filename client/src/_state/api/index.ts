/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export const UserSignUp = async (data: any) => API.post('/user/signup', data);
export const UserSignIn = async (data: any) => API.post('/user/signin', data);

export const getDashboardDetails = async (token: any) =>
  API.get('/user/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token: any, date: any) =>
  await API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token: any, data: any) =>
  await API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
