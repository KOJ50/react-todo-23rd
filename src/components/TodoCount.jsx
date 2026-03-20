function TodoCount({ todos }) {
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="w-full rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
      남은 할 일 {remainingCount}개
    </div>
  );
}

export default TodoCount;
