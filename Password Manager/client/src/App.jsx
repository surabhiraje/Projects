import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // custom CSS file

function App() {
  const [data, setData] = useState([]);
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState(false); // toggle visibility

  const fetchPasswords = async () => {
    const res = await axios.get("http://localhost:5000/api/passwords");
    setData(res.data);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/passwords", {
        site,
        username,
        password,
      });
      setSite("");
      setUsername("");
      setPassword("");
      await fetchPasswords();
      setMessage("✅ Password saved successfully!");
    } catch (error) {
      setMessage("❌ Failed to save password.");
    }

    setLoading(false);

    setTimeout(() => setMessage(""), 3000);
  };

  const deletePassword = async (id) => {
    await axios.delete(`http://localhost:5000/api/passwords/${id}`);
    fetchPasswords();
  };

  return (
    <div className="container">
      <h2 className="title">Password Manager 🔐</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Saving..." : "💾 Save"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <button
        className="toggle-btn"
        onClick={() => setShowPasswords(!showPasswords)}
      >
        {showPasswords ? "🙈 Hide Saved Passwords" : "👁 Show Saved Passwords"}
      </button>

      {showPasswords && (
        <>
          <h3 className="subtitle">Saved Passwords</h3>
          <ul className="list">
            {data.map((item) => (
              <li className="list-item" key={item._id}>
                <strong>{item.site}</strong> | {item.username} | {item.password}
                <button
                  className="delete-btn"
                  onClick={() => deletePassword(item._id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
