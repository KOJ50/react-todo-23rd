import { useState } from "react";

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
    <div className="flex w-full gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="오늘의 할 일을 입력하세요"
        className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <button
        onClick={handleSubmit}
        className="rounded-2xl bg-blue-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-95"
      >
        추가
      </button>
    </div>
  );
}

export default TodoInput;
