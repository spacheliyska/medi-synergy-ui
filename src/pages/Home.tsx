import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import paracetamol from "../assets/paracetamol.jpg";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import "../styles/Home.css";

const Home = () => {
  const getApiCall = getAllApi();
  const [data, setData] = useState<Medicine[]>([]);

  useEffect(() => {
    async function getUseCases() {
      await getApiCall.performRequest().then((response) => {
        console.log(response);
        setData(response.data);
      });
    }
    getUseCases();
  }, []);

  return (
    <div className="medication-container">
      <SearchBar></SearchBar>
      <div className="card-container">
        {data && data.length > 0
          ? data.map((medicine: Medicine) => (
              <Card
                avatar={paracetamol}
                title={medicine.title}
                composition={medicine.composition}
                btnText="Добави"
                sideEffects={medicine.sideEffects}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Home;
