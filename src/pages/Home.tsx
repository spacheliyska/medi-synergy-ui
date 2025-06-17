import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import paracetamol from "../assets/paracetamol.jpg";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import "../styles/Home.css";

const Home = () => {
  const [data, setData] = useState<Medicine[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const getApiCall = getAllApi();
    async function getUseCases() {
      await getApiCall.performRequest().then((response) => {
        setData(response.data);
      });
    }
    getUseCases();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  const filteredData = data.filter((medicine) => {
    const search = debouncedQuery.trim().toLowerCase();
    return medicine.title.toLowerCase().includes(search);
  });

  return (
    <div className="medication-container">
      <SearchBar
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
      />
      <div className="card-container">
        {filteredData.length > 0
          ? filteredData.map((medicine: Medicine, idx: number) => (
              <Card
                key={medicine.title + idx}
                avatar={paracetamol}
                title={medicine.title}
                composition={medicine.composition}
                btnText="Добави"
                sideEffects={medicine.sideEffects}
              />
            ))
          : "Няма намерени лекарства"}
      </div>
    </div>
  );
};

export default Home;
