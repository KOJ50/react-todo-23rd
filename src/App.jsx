import { useEffect, useState } from "react";
import CurrentDate from "./components/CurrentDate";
import DateNavigator from "./components/DateNavigator";
import TodoInput from "./components/TodoInput";
import TodoCount from "./components/TodoCount";
import TodoList from "./components/TodoList";
import "./App.css";

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-3xl bg-slate-100/80 p-6 shadow-xl backdrop-blur">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            To Do
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            날짜별로 할 일을 정리해보세요
          </p>
        </header>

        <DateNavigator
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />

        <div className="mb-4 flex justify-center">
          <CurrentDate currentDate={currentDate} />
        </div>

        <section className="mb-4">
          <TodoInput onAddTodo={addTodo} />
        </section>

        <section className="mb-4">
          <TodoCount todos={currentTodos} />
        </section>

        <section>
          <TodoList
            todos={currentTodos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
