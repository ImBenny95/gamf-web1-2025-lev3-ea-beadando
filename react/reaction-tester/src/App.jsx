import { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState("wait"); // wait, ready, tooSoon, success
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);

  useEffect(() => {
    let timeout;
    if (status === "wait") {
      timeout = setTimeout(() => {
        setStatus("ready");
        setStartTime(Date.now());
      }, Math.random() * 3000 + 2000); // 2-5 másodperc
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
      case "wait": return "#cc0000"; // piros
      case "ready": return "#00cc00"; // zöld
      case "tooSoon": return "#ffcc00"; // sárga
      case "success": return "#0066cc"; // kék
      default: return "#333";
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
    <div
      onClick={handleClick}
      style={{
        height: "100vh",
        backgroundColor: getBackgroundColor(),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        cursor: "pointer",
        userSelect: "none",
        textAlign: "center",
      }}
    >
      <h1>Reakcióidő teszt</h1>
      <p style={{ fontSize: "1.5rem" }}>{getMessage()}</p>
    </div>
  );
}

export default App;
