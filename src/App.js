import React, { useState } from 'react';
import { IoIosAddCircle, IoIosCheckboxOutline, IoIosCheckbox } from 'react-icons/io';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 할 일 추가
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // 체크 토글
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Enter키로 추가
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className="bg">
      <div className="todo-card">
        <h1 className="title">나의 할 일 앱</h1>
        <div className="todo-count">남은 할 일: {todos.filter(todo => !todo.completed).length}개</div>
        <div className="input-row">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="할 일을 입력하세요."
            className="todo-input"
          />
          <button className="add-btn" onClick={addTodo} aria-label="추가">
            <IoIosAddCircle size={36} />
          </button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item${todo.completed ? ' completed' : ''}`}>
              <button
                className="check-btn"
                onClick={() => toggleTodo(todo.id)}
                aria-label={todo.completed ? "완료 해제" : "완료 표시"}
              >
                {todo.completed ? (
                  <IoIosCheckbox size={26} color="#3f51b5" />
                ) : (
                  <IoIosCheckboxOutline size={26} color="#b0b0b0" />
                )}
              </button>
              <span className="todo-text">{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
