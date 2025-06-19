import React, { useEffect, useState } from "react";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import "../styles/Compare.css";
import Navbar from "../components/Navbar";

const Compare = () => {
  const [data, setData] = useState<Medicine[]>([]);
  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");

  useEffect(() => {
    const getApiCall = getAllApi();
    async function fetchData() {
      await getApiCall.performRequest().then((response) => {
        setData(response.data);
      });
    }
    fetchData();
  }, []);

  const med1 = data.find((m) => m.title === first);
  const med2 = data.find((m) => m.title === second);

  let result = "";
  let resultClass = "";
  if (med1 && med2) {
    const comp1 = med1.composition
      .toLowerCase()
      .split(/,| /)
      .map((s) => s.trim())
      .filter(Boolean);
    const comp2 = med2.composition
      .toLowerCase()
      .split(/,| /)
      .map((s) => s.trim())
      .filter(Boolean);
    const intersection = comp1.filter((c) => comp2.includes(c));
    if (intersection.length > 0) {
      result =
        "❌ Несъвместими (имат общи съставки: " +
        intersection.join(", ") +
        ")";
      resultClass = "not-compatible";
    } else {
      result = "✅ Съвместими (нямат общи съставки)";
      resultClass = "compatible";
    }
  }

  return (
    <>
      <Navbar />
      <div className="compare-container">
        <h1 className="compare-title">Сравни лекарства</h1>
        <div className="compare-selectors">
          <div className="selector-group">
            <label htmlFor="first-med">Първо лекарство</label>
            <select
              id="first-med"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className="compare-select"
            >
              <option value="">Избери първо лекарство</option>
              {data.map((m) => (
                <option key={m.title} value={m.title}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <span className="compare-and">и</span>
          <div className="selector-group">
            <label htmlFor="second-med">Второ лекарство</label>
            <select
              id="second-med"
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              className="compare-select"
            >
              <option value="">Избери второ лекарство</option>
              {data.map((m) => (
                <option key={m.title + "_2"} value={m.title}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {med1 && med2 && (
          <div className={`compare-result ${resultClass}`}>
            <h3>Резултат:</h3>
            <p>{result}</p>
            <div className="compare-details">
              <div>
                <strong>{med1.title}</strong>
                <div className="compare-composition">{med1.composition}</div>
              </div>
              <span className="compare-vs">vs</span>
              <div>
                <strong>{med2.title}</strong>
                <div className="compare-composition">{med2.composition}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Compare;
