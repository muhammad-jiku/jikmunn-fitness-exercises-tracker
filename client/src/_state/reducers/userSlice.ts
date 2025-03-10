import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.currentUser = action.payload.data.data.user;
      localStorage.setItem(
        'fitness-exercise-tracker-token',
        action.payload.data.data.accessToken
      );
      localStorage.setItem(
        'fitness-exercise-tracker-refresh-token',
        action.payload.data.data.refreshToken
      );
    },
    loginSuccess: (state, action) => {
      console.log('action payload..', action.payload);
      state.currentUser = action.payload.data.data.user;
      localStorage.setItem(
        'fitness-exercise-tracker-token',
        action.payload.data.data.accessToken
      );
      localStorage.setItem(
        'fitness-exercise-tracker-refresh-token',
        action.payload.data.data.refreshToken
      );
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('fitness-exercise-tracker-token');
      localStorage.removeItem('fitness-exercise-tracker-refresh-token');
    },
  },
});

export const { signupSuccess, loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
