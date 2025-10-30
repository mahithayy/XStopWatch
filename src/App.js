import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearTimeout(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `Time: ${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <button onClick={handleStartStop}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
