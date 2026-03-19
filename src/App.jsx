import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function DateNavigator({ onChangeDate }) {
  return (
    <div>
      <button onClick={() => onChangeDate(-7)}>◀◀</button>
      <button onClick={() => onChangeDate(-1)}>◀</button>
      <button onClick={() => onChangeDate(1)}>▶</button>
      <button onClick={() => onChangeDate(7)}>▶▶</button>
    </div>
  );
}

function CurrentDate({ currentDate }) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return (
    <p>
      {year}년 {month}월 {day}일
    </p>
  );
}

function TodoInput({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit() {
    if (!inputValue.trim()) return;
    onAddTodo(inputValue);
    setInputValue("");
  }

  function handleKeyDown(event) {
    if (event.nativeEvent.isComposing) return;

    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>추가</button>
    </div>
  );
}

function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
      />
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDeleteTodo(todo.id)}>X</button>
    </li>
  );
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

function TodoCount({ todos }) {
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return <p>남은 할 일 {remainingCount}개</p>;
}

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [todosByDate, setTodosByDate] = useState(() => {
    const savedTodos = localStorage.getItem("todosByDate");
    return savedTodos ? JSON.parse(savedTodos) : {};
  });

  const dateKey = formatDateKey(currentDate);
  const currentTodos = todosByDate[dateKey] || [];

  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);

  function changeDate(days) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  }

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodosByDate((prev) => {
      const previousTodos = prev[dateKey] || [];

      return {
        ...prev,
        [dateKey]: [...previousTodos, newTodo],
      };
    });
  }

  function toggleTodo(id) {
    setTodosByDate((prev) => {
      const updatedTodos = (prev[dateKey] || []).map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      return {
        ...prev,
        [dateKey]: updatedTodos,
      };
    });
  }

  function deleteTodo(id) {
    setTodosByDate((prev) => {
      const updatedTodos = (prev[dateKey] || []).filter(
        (todo) => todo.id !== id,
      );

      return {
        ...prev,
        [dateKey]: updatedTodos,
      };
    });
  }

  return (
    <div>
      <h1>To Do</h1>

      <DateNavigator onChangeDate={changeDate} />
      <CurrentDate currentDate={currentDate} />

      <TodoInput onAddTodo={addTodo} />
      <TodoCount todos={currentTodos} />
      <TodoList
        todos={currentTodos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
