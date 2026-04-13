import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    const storage = credentials.rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', data.token);
    return data;
  } catch (err) { return rejectWithValue(err.response?.data?.message || 'Login failed'); }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    sessionStorage.setItem('token', data.token);
    return data;
  } catch (err) { return rejectWithValue(err.response?.data?.message || 'Registration failed'); }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (err) { return rejectWithValue('Session expired'); }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null, isAuthenticated: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.isAuthenticated = true; })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(register.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(register.fulfilled, (s, a) => { s.loading = false; s.user = a.payload.user; s.isAuthenticated = true; })
      .addCase(register.rejected, (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(loadUser.fulfilled, (s, a) => { s.user = a.payload.user; s.isAuthenticated = true; s.loading = false; })
      .addCase(loadUser.rejected, (s) => { s.loading = false; s.isAuthenticated = false; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
