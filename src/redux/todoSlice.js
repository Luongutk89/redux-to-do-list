import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all', // all | completed | pending
    search: '',     // Từ khóa tìm kiếm
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        tags: action.payload.tags, // Nhãn (tags)
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload; // Thay đổi bộ lọc
    },
    setSearch: (state, action) => {
      state.search = action.payload; // Cập nhật từ khóa tìm kiếm
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, setSearch } = todoSlice.actions;
export default todoSlice.reducer;
