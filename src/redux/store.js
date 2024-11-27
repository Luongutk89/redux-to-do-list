import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// Hàm để lưu trạng thái vào localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (e) {
    console.warn('Could not save state', e);
  }
};

// Hàm để tải dữ liệu từ localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('todos');
    if (serializedState === null) {
      return undefined; // Trả về undefined nếu không có dữ liệu
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Could not load state', e);
    return undefined;
  }
};

// Khởi tạo store với dữ liệu từ localStorage
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: loadFromLocalStorage(), // Tải dữ liệu từ localStorage khi khởi động
});

// Lắng nghe thay đổi trong store và lưu vào localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
