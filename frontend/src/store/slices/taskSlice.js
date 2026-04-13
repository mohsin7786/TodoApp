import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './authSlice';
import api from '../../utils/api';

export const fetchTasks = createAsyncThunk('tasks/fetch', async (params) => {
  const { data } = await api.get('/tasks', { params });
  return data;
});

export const createTask = createAsyncThunk('tasks/create', async (taskData) => {
  const { data } = await api.post('/tasks', taskData);
  return data;
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, ...updates }) => {
  const { data } = await api.put(`/tasks/${id}`, updates);
  return data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

export const undoDeleteTask = createAsyncThunk('tasks/undo', async (id) => {
  const { data } = await api.put(`/tasks/${id}/undo`);
  return data;
});

export const fetchStats = createAsyncThunk('tasks/stats', async () => {
  const { data } = await api.get('/tasks/stats');
  return data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], stats: null, loading: false, error: null },
  reducers: {
    reorderLocal: (state, action) => { state.items = action.payload; },
  },
extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (s) => { s.loading = true; })
      .addCase(fetchTasks.fulfilled, (s, a) => { s.loading = false; s.items = a.payload; })
      .addCase(fetchTasks.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })
      .addCase(createTask.fulfilled, (s, a) => { s.items.unshift(a.payload); })
      .addCase(updateTask.fulfilled, (s, a) => { const i = s.items.findIndex(t => t._id === a.payload._id); if (i !== -1) s.items[i] = a.payload; })
      .addCase(deleteTask.fulfilled, (s, a) => { s.items = s.items.filter(t => t._id !== a.payload); })
      .addCase(fetchStats.fulfilled, (s, a) => { s.stats = a.payload; })
      .addCase(logout, (state) => {
        state.items = [];
        state.stats = null;
      });
  },
});

export const { reorderLocal } = taskSlice.actions;
export default taskSlice.reducer;
