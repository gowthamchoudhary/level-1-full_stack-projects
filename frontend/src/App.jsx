import axios from "axios";
import { useState } from "react";

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
      <h1>Ask anything</h1>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask something "
      />
      <button onClick={askAI}>ASK</button>
      {loading && <p>Loading.....</p>}
      {answer && (
        <div>
          <strong>ANSWER</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
