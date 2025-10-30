import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef(null);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearTimeout(timerId.current);
    setTimer(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      timerId.current = setTimeout(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timerId.current);
  }, [isRunning, timer]);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <h2>{formatTime(timer)}</h2>
      <button onClick={handleStartStop}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
