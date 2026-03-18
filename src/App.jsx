import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function Enter() {
  return (
    <>
      <input classname="input"></input>
      <button classname="enter">등록</button>
    </>
  );
}

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

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <h1>To Do</h1>

      <div>
        <button onClick={() => changeDate(currentDate, setCurrentDate, -1)}>
          ◀
        </button>
        <CurrentDate currentDate={currentDate} />
        <button onClick={() => changeDate(currentDate, setCurrentDate, 1)}>
          ▶
        </button>
      </div>

      <Enter />
    </div>
  );
}

export default App;
