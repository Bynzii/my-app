import { useState } from "react";
import '../assets/css/Memo.css';

function Memo() {
  const [memo, setMemo] = useState('');
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, done: !todo.done} : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="memo__wrap">
      <div className="memo__sec">
        <h2 className="memo__tit">📝 메모</h2>
        <textarea 
          className="memo__textarea"
          placeholder="자유롭게 메모하세용~"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>

      <div className="memo__sec">
        <h2 className="meno__tit">✅ 할일</h2>

        <div className="memo__input-row">
          <input 
            type="text" 
            className="memo__it" 
            placeholder="할 일을 입력하세용"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button className="memo__add-btn" onClick={addTodo}>추가</button>
        </div>

        <ul className="memo__todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={`memo__todo-item ${todo.done ? 'done' : ''}`}>
              <label className="memo__todo-label">
                <input 
                  type="checkbox" 
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />

                <span className="memo__todo-text">{todo.text}</span>
              </label>
              <button className="memo__delete-btn" onClick={() => deleteTodo(todo.id)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Memo;