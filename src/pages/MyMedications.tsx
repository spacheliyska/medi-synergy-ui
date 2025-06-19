import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/MyMedications.css";
import paracetamol from "../assets/paracetamol.jpg";
import SearchBar from "../components/SearchBar";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import Navbar from "../components/Navbar";

const MyMedications = () => {
  const getApiCall = getAllApi();
  const [data, setData] = useState<Medicine[]>([]);
  const [medications, setMedications] = useState<Medicine[]>([]);

  useEffect(() => {
    async function getUseCases() {
      await getApiCall.performRequest().then((response) => {
        console.log(response);
        setData(response.data);
        setMedications(response.data); // <-- Add this line
      });
    }
    getUseCases();
  }, []);

  const [searchValue, setSearchValue] = useState<string>("");

  const handleRemove = (title: string) => {
    setMedications((prev) => prev.filter((m) => m.title !== title));
  };

  return (
    <>
      <Navbar />
      <div className="medication-container">
        <SearchBar
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <div className="card-container">
          {medications && medications.length > 0
            ? medications.map((medicine: Medicine) => (
                <Card
                  avatar={paracetamol}
                  title={medicine.title}
                  composition={medicine.composition}
                  btnText="Премахни"
                  sideEffects={medicine.sideEffects}
                  onRemove={() => handleRemove(medicine.title)}
                />
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default MyMedications;
