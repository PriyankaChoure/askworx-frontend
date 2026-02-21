import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, refreshToken } from '../../services/authService';

export const login = createAsyncThunk('auth/login', async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await loginUser({ username, password });
    
    // Check if force password reset is required
    if (response.forcePasswordReset) {
      return rejectWithValue({
        forcePasswordReset: true,
        userId: response.userId,
        message: response.message
      });
    }
    
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Login failed' });
  }
});

export const refreshTokenThunk = createAsyncThunk('auth/refreshToken', async (refreshToken) => {
  return await refreshToken(refreshToken);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    tokens: null,
    subscriptionWarning: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.subscriptionWarning = null;
      localStorage.removeItem('tokens');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.subscriptionWarning = action.payload.subscriptionWarning || null;
        localStorage.setItem('tokens', JSON.stringify(action.payload.tokens));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.tokens = action.payload;
        localStorage.setItem('tokens', JSON.stringify(action.payload));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;