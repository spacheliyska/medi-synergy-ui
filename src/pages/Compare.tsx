import React, { useEffect, useState } from "react";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import "../styles/Compare.css";

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
        "Несъвместими (имат общи съставки: " +
        intersection.join(", ") +
        ")";
    } else {
      result = "Съвместими (нямат общи съставки)";
    }
  }

  return (
    <div className="compare-container">
      <h1>Сравни лекарства</h1>
      <div className="compare-selectors">
        <select value={first} onChange={(e) => setFirst(e.target.value)}>
          <option value="">Избери първо лекарство</option>
          {data.map((m) => (
            <option key={m.title} value={m.title}>
              {m.title}
            </option>
          ))}
        </select>
        <span style={{ margin: "0 10px" }}>и</span>
        <select value={second} onChange={(e) => setSecond(e.target.value)}>
          <option value="">Избери второ лекарство</option>
          {data.map((m) => (
            <option key={m.title + "_2"} value={m.title}>
              {m.title}
            </option>
          ))}
        </select>
      </div>
      {med1 && med2 && (
        <div className="compare-result">
          <h3>Резултат:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default Compare;
