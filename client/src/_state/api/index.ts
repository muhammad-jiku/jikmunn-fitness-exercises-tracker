import axios from 'axios';

interface UserSignUpData {
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
  API.post('/user/signup', data);

export const UserSignIn = async (data: UserSignInData) =>
  API.post('/user/signin', data);

export const getDashboardDetails = async (token: string) =>
  API.get('/user/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getWorkouts = async (token: string, date: string) =>
  API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token: string, data: WorkoutData) =>
  API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
