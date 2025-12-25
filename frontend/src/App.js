import { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

function App() {
  const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Get exchange rate
  const getRate = async () => {
    setError("");
    setResult(null);
    setRate(null);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/rate?from=${from}&to=${to}`
      );

      if (!res.ok) {
        throw new Error("Rate not found");
      }

      const data = await res.text();
      setRate(Number(data));
    } catch (err) {
      setError("Unable to fetch exchange rate");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Convert currency
  const convertCurrency = async () => {
    setError("");
    setRate(null);
    setResult(null);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (from === to) {
      setError("From and To currency cannot be the same");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/convert?from=${from}&to=${to}&amount=${amount}`
      );

      if (!res.ok) {
        throw new Error("Conversion failed");
      }

      const data = await res.json();
      setResult(data.convertedAmount);
    } catch (err) {
      setError("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="app-container">
        <div className="card">
          <h1 className="title">🌍 Currency Converter</h1>
          <p className="subtitle">SprintGlobalPay</p>

          <div className="field">
            <label>From Currency</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>To Currency</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {currencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button className="btn secondary" onClick={getRate} disabled={loading}>
              Get Rate
            </button>
            <button className="btn primary" onClick={convertCurrency} disabled={loading}>
              Convert
            </button>
          </div>

          {loading && <div className="info">Loading...</div>}

          {rate !== null && (
            <div className="result">
              💱 1 {from} = <strong>{rate}</strong> {to}
            </div>
          )}

          {result !== null && (
            <div className="result success">
              ✅ Converted Amount: <strong>{result}</strong> {to}
            </div>
          )}

          {error && <div className="error">{error}</div>}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
