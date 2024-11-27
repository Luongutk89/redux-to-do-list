import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Quản lý Công Việc</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
