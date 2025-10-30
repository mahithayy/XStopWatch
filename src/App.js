import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const timerId = useRef(null);

  const handleStartStop = () => {
    setIsTimerStarted(!isTimerStarted);
  };

  const handleReset = () => {
    setTimer(0);
    setIsTimerStarted(false);
  };

  useEffect(() => {
    if (isTimerStarted) {
      timerId.current = setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    }
    return () => clearTimeout(timerId.current);
  }, [timer, isTimerStarted]);

  const formatTime = (timer) => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return (
    <div className="App">
      <h1>{formatTime(timer)}</h1>
      <button onClick={handleStartStop}>
        {isTimerStarted ? "stop" : "start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
