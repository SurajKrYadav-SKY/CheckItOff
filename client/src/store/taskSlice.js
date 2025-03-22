import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../lib/api-client";
import { TASKS_ROUTE } from "../utils/constants";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await apiClient.get(TASKS_ROUTE, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    console.log("Fetched tasks:", response.data.data);
    return response.data.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, { getState }) => {
    const { auth } = getState();
    const response = await apiClient.post(
      TASKS_ROUTE,
      { text, completed: false },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );
    console.log("Added task:", response.data.data);
    return response.data.data;
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async (id, { getState }) => {
    const { auth, tasks } = getState();
    const task = tasks.tasks.find((t) => t.id === id);
    const response = await apiClient.put(
      `${TASKS_ROUTE}/${id}`,
      { completed: !task.completed },
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );
    return response.data.data;
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id, { getState }) => {
    const { auth } = getState();
    await apiClient.delete(`${TASKS_ROUTE}/${id}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log("Fetch tasks failed:", action.error.message);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message;
        console.log("Add task failed:", action.error.message);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
