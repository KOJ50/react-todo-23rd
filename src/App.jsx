import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function changeDate(currentDate, setCurrentDate, days) {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + days);
  setCurrentDate(newDate);
}

function CurrentDate({ currentDate }) {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return (
    <span>
      {year}년 {month}월 {day}일
    </span>
  );
}

function TodoInput({ inputValue, onChangeInput, onAddTodo }) {
  return (
    <section>
      <input type="text" value={inputValue} onChange={onChangeInput} />
      <button onClick={onAddTodo}>추가</button>
    </section>
  );
}

function TodoList({ list }) {
  return (
    <section>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputValue, setInputValue] = useState(""); // 입력창 상태
  const [list, setList] = useState([]); // 리스트 배열 상태

  // 입력값 변경 시 호출되는 핸들러
  const handleChange = (e) => setInputValue(e.target.value);
  // 추가 버튼 클릭 시
  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setList([...list, inputValue]); // 기존 리스트에 추가
      setInputValue(""); // 입력창 초기화
    }
  };

  return (
    <div>
      <header>
        <h1>To Do</h1>
      </header>

      <main>
        <section>
          <button onClick={() => changeDate(currentDate, setCurrentDate, -7)}>
            ◀◀
          </button>
          <button onClick={() => changeDate(currentDate, setCurrentDate, -1)}>
            ◀
          </button>
          <CurrentDate currentDate={currentDate} />
          <button onClick={() => changeDate(currentDate, setCurrentDate, 1)}>
            ▶
          </button>
          <button onClick={() => changeDate(currentDate, setCurrentDate, 7)}>
            ▶▶
          </button>
        </section>
        <section>
          <TodoInput
            inputValue={inputValue}
            onChangeInput={handleChange}
            onAddTodo={handleAdd}
          />
          <TodoList list={list} />
        </section>
      </main>
    </div>
  );
}

export default App;
