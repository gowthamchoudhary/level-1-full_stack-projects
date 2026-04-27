import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat/ask", null, {
        params: { question },
      });

      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Error fetching the answer");
    }

    setLoading(false);
  };
  return (
    <div>
      <div className="container">
        <h1 id="title">Ask anything.</h1>

        <div className="input-box">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
          ></textarea>
        </div>

        <button onClick={askAI}>ASK</button>
      </div>
      {loading && <p>Loading.....</p>}
      {answer && (
        <div>
          <strong>ANSWER</strong>
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
