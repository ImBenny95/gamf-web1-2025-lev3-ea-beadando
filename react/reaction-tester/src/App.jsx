import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [status, setStatus] = useState("wait");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);

  useEffect(() => {
    let timeout;
    if (status === "wait") {
      timeout = setTimeout(() => {
        setStatus("ready");
        setStartTime(Date.now());
      }, Math.random() * 3000 + 2000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const handleClick = () => {
    if (status === "wait") {
      setStatus("tooSoon");
      setReactionTime(null);
      restartAfterDelay();
    } else if (status === "ready") {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setStatus("success");
      restartAfterDelay();
    }
  };

  const restartAfterDelay = () => {
    setTimeout(() => {
      setStatus("wait");
      setReactionTime(null);
    }, 2000);
  };

  const getBackgroundColor = () => {
    switch (status) {
      case "wait": return "#cc0000";
      case "ready": return "#00cc00";
      case "tooSoon": return "#ffcc00";
      case "success": return "#0066cc";
      default: return "#ccc";
    }
  };

  const getMessage = () => {
    switch (status) {
      case "wait": return "Várj a zöld színre!";
      case "ready": return "Most! Kattints most!";
      case "tooSoon": return "Túl korán kattintottál!";
      case "success": return `Reakcióidőd: ${reactionTime} ms`;
      default: return "";
    }
  };

  return (
    <div className="App">
      <div
        className="reaction-box"
        onClick={handleClick}
        style={{ backgroundColor: getBackgroundColor() }}
      >
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Reakcióidő teszt</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>{getMessage()}</p>
      </div>
    </div>
  );
}

export default App;
