import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, setFilter, setSearch, addTodo } from '../redux/todoSlice';

const TodoList = () => {
  const { items, filter, search } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingTodo, setEditingTodo] = useState(null); // State để lưu công việc đang chỉnh sửa
  const [newText, setNewText] = useState('');

  const filteredTodos = items.filter((todo) => {
    if (filter === 'completed' && !todo.completed) return false;
    if (filter === 'pending' && todo.completed) return false;
    if (search && !todo.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewText(todo.text);
  };

  const handleSave = (todoId) => {
    dispatch(addTodo({
      text: newText,
      tags: editingTodo.tags,
    }));
    setEditingTodo(null); // Đóng form sửa
  };

  return (
    <div>
      {/* Bộ lọc */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <button
            className={`btn btn-${filter === 'all' ? 'primary' : 'outline-primary'} me-2`}
            onClick={() => dispatch(setFilter('all'))}
          >
            Tất cả
          </button>
          <button
            className={`btn btn-${filter === 'completed' ? 'primary' : 'outline-primary'} me-2`}
            onClick={() => dispatch(setFilter('completed'))}
          >
            Hoàn thành
          </button>
          <button
            className={`btn btn-${filter === 'pending' ? 'primary' : 'outline-primary'}`}
            onClick={() => dispatch(setFilter('pending'))}
          >
            Chưa hoàn thành
          </button>
        </div>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Tìm kiếm..."
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      {/* Danh sách công việc */}
      <ul className="list-group">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            {/* Nếu đang chỉnh sửa công việc này */}
            {editingTodo && editingTodo.id === todo.id ? (
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
                <button className="btn btn-success ms-2" onClick={() => handleSave(todo.id)}>Lưu</button>
                <button className="btn btn-secondary ms-2" onClick={() => setEditingTodo(null)}>Hủy</button>
              </div>
            ) : (
              <span
                onClick={() => dispatch(toggleTodo(todo.id))}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {todo.text} <small className="text-muted">({todo.tags.join(', ')})</small>
              </span>
            )}
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => handleEdit(todo)}>Sửa</button>
              <button className="btn btn-danger btn-sm ms-2" onClick={() => dispatch(deleteTodo(todo.id))}>
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
