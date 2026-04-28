import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const history_retr = async () => {
    const res = await fetch("http://127.0.0.1:8000/chat/history");
    console.log(res);
    const history = await res.json();
    setHistory(history);
    console.log(history);
  };

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const params = new URLSearchParams({ question });
      const res = await fetch(`http://127.0.0.1:8000/chat/ask?${params}`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Error fetching the answer");
      }

      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button className="hst-btn" onClick={history_retr}>
        HISTORY
      </button>
      {history && (
        <div className="history-content">
          {history.map((item) => (
            <div key={item.id}>
              <p>Question: {item.question}</p>
              <p>Answer: {item.answer}</p>
            </div>
          ))}
        </div>
      )}
      <div className="container">
        <h1 id="title">Ask anything.</h1>

        <div className="input-box">
          <div className="textarea-bg">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask something..."
            ></textarea>
          </div>
          <button onClick={askAI}>ASK</button>
        </div>
      </div>
      {loading && <p>Loading.....</p>}
      {answer && (
        <div className="answes-box">
          <p>{answer}</p>
        </div>
      )}
      <video
        className="space-video"
        src="/videos/web_screen_power_vid.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}

export default App;
