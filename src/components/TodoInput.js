import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoSlice';

const TodoInput = () => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo({ text: input, tags: tags.split(',').map(tag => tag.trim()) }));
      setInput('');
      setTags('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <input
          type="text"
          className="form-control"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Nhập nhãn (tags), cách nhau bằng dấu phẩy..."
        />
        <button className="btn btn-primary" type="submit">Thêm</button>
      </div>
    </form>
  );
};

export default TodoInput;
