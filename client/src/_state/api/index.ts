import axios from 'axios';

export interface UserSignUpData {
  name: string;
  email: string;
  password: string;
}

interface UserSignInData {
  email: string;
  password: string;
}

interface WorkoutData {
  // name: string;
  // category: string;
  workoutString: string;
  // sets: number;
  // reps: number;
  // weight: number;
  // duration: number;
}

// Create an Axios instance with a base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
});

// Define API functions with proper types
export const UserSignUp = async (data: UserSignUpData) =>
  // {
  //   console.log('api user sign up', data);
  API.post('/users/create', data);
// };

export const UserSignIn = async (data: UserSignInData) =>
  API.post('/users/login', data);

export const getDashboardDetails = async (token: string) =>
  API.get('/users/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token: string, date: string) =>
  API.get(`/workouts${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token: string, data: WorkoutData) =>
  API.post(`/workouts/add`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
