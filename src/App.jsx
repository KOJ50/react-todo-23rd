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

function CurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const currentDate = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      <p>{currentDate}</p>
    </>
  );
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>To Do</h1>
      <CurrentDate />
      <Enter />
    </div>
  );
}

export default App;
