import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "../styles/MyMedications.css";
import paracetamol from "../assets/paracetamol.jpg";
import SearchBar from "../components/SearchBar";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import Navbar from "../components/Navbar";
import aulin from "../assets/aulin.jpg";
import analgin from "../assets/analgin.png";
import ibuprofen from "../assets/ibuprofen.jpg";
import aspirin from "../assets/aspirin.webp";
import "../styles/Home.css";
import amoksiklav from "../assets/amoksiklav.jpg";
import aksef from "../assets/aksef.jpg";
import clarithromycin from "../assets/clarithromycin.webp";
import diklofenak from "../assets/diklofenak.jpg";
import paracetamol_kofein from "../assets/paracetamol-kofein.webp";

const getAvatarSrc = (title: string) => {
  const key = title.toLowerCase();
  switch (key) {
    case "аулин":
      return aulin;
    case "аналгин":
      return analgin;
    case "ибупрофен":
      return ibuprofen;
    case "парацетамол":
      return paracetamol;
    case "аспирин":
      return aspirin;
    case "амоксицилин":
      return amoksiklav;
    case "цефуроксим":
      return aksef;
    case "кларитромицин":
      return clarithromycin;
    case "диклофенак":
      return diklofenak;
    case "парацетамол + кофеин":
      return paracetamol_kofein;
    default:
      return paracetamol;
  }
};

const MyMedications = () => {
  const getApiCall = getAllApi();
  const [data, setData] = useState<Medicine[]>([]);
  const [medications, setMedications] = useState<Medicine[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function getUseCases() {
      await getApiCall.performRequest().then((response) => {
        setData(response.data);
        setMedications(
          response.data.filter(
            (medicine: Medicine) =>
              medicine.title.toLowerCase() === "парацетамол" ||
              medicine.title.toLowerCase() === "аналгин"
          )
        );
      });
    }
    getUseCases();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("myMedications");
    if (stored) {
      setMedications(JSON.parse(stored));
    } else if (data.length > 0) {
      const initial = data.filter(
        (medicine: Medicine) =>
          medicine.title.toLowerCase() === "парацетамол" ||
          medicine.title.toLowerCase() === "аналгин"
      );
      setMedications(initial);
      localStorage.setItem("myMedications", JSON.stringify(initial));
    }
    const sync = () => {
      const updated = localStorage.getItem("myMedications");
      if (updated) setMedications(JSON.parse(updated));
    };
    window.addEventListener("myMedicationsChanged", sync);
    return () => window.removeEventListener("myMedicationsChanged", sync);
  }, [data]);

  useEffect(() => {
    const handler = (e: any) => {
      const med: Medicine = e.detail;
      setMedications((prev) => {
        if (prev.some((m) => m.title === med.title)) return prev;
        return [...prev, med];
      });
    };
    window.addEventListener("addMedication", handler);
    return () => window.removeEventListener("addMedication", handler);
  }, []);

  const filteredMedications = medications.filter((medicine) =>
    medicine.title.toLowerCase().includes(searchValue.trim().toLowerCase())
  );

  const handleRemove = (title: string) => {
    setMedications((prev) => {
      const updated = prev.filter((m) => m.title !== title);
      localStorage.setItem("myMedications", JSON.stringify(updated));
      window.dispatchEvent(new Event("myMedicationsChanged"));
      setSuccess("Лекарството беше премахнато!");
      setTimeout(() => setSuccess(null), 2000);
      return updated;
    });
  };

  return (
    <>
      <Navbar />
      <div className="medication-container">
        {success && <div className="success-strip">{success}</div>}
        <SearchBar
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <div className="card-container">
          {filteredMedications && filteredMedications.length > 0
            ? filteredMedications.map((medicine: Medicine) => (
                <Card
                  key={medicine.title}
                  avatar={getAvatarSrc(medicine.title)}
                  title={medicine.title}
                  composition={medicine.composition}
                  btnText="Премахни"
                  sideEffects={medicine.sideEffects}
                  onRemove={() => handleRemove(medicine.title)}
                />
              ))
            : "Няма намерени лекарства"}
        </div>
      </div>
    </>
  );
};

export default MyMedications;
