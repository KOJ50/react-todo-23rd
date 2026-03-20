function TodoItem({ todo, onToggleTodo, onDeleteTodo }) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
          className="h-5 w-5 accent-blue-500"
        />
        <span
          className={`text-base ${
            todo.completed ? "text-slate-400 line-through" : "text-slate-700"
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDeleteTodo(todo.id)}
        className="rounded-xl bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-500 transition hover:bg-rose-100"
      >
        삭제
      </button>
    </li>
  );
}

export default TodoItem;
