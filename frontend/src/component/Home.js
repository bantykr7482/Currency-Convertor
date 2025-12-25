import { useState } from "react";

function Home() {
  const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "SGD"];

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);

  // Fetch exchange rate
  const getRate = async () => {
    const res = await fetch(
      `http://localhost:8080/rate?from=${from}&to=${to}`
    );
    const data = await res.text();
    setRate(data);
  };

  // Convert currency
  const convertCurrency = async () => {
    const res = await fetch(
      `http://localhost:8080/convert?from=${from}&to=${to}&amount=${amount}`
    );
    const data = await res.json();
    setResult(data.convertedAmount);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h2>🌍 Exchange Rate Panel</h2>

      <label>From Currency:</label>
      <br />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        {currencies.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <br /><br />

      <label>To Currency:</label>
      <br />
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        {currencies.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <br /><br />

      <label>Amount:</label>
      <br />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={getRate}>Get Exchange Rate</button>
      &nbsp;&nbsp;
      <button onClick={convertCurrency}>Convert</button>

      <br /><br />

      {rate && (
        <p>
          💱 Rate: 1 {from} = {rate} {to}
        </p>
      )}

      {result && (
        <h3>
          ✅ Converted Amount: {result} {to}
        </h3>
      )}
    </div>
  );
}

export default Home;
