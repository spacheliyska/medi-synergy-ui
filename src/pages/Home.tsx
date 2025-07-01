import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import paracetamol from "../assets/paracetamol.jpg";
import aulin from "../assets/aulin.jpg";
import analgin from "../assets/analgin.png";
import ibuprofen from "../assets/ibuprofen.jpg";
import aspirin from "../assets/aspirin.webp";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
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

const Home = () => {
  const [data, setData] = useState<Medicine[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [myMedications, setMyMedications] = useState<Medicine[]>([]);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleAdd = (medicine: Medicine) => {
    setMyMedications((prev) => {
      if (prev.some((m) => m.title === medicine.title)) {
        setSuccess("Лекарството вече е добавено.");
        setTimeout(() => setSuccess(null), 2000);
        return prev;
      }
      const updated = [...prev, medicine];
      localStorage.setItem("myMedications", JSON.stringify(updated));
      window.dispatchEvent(new Event("myMedicationsChanged"));
      setSuccess("Успешно добавено!");
      setTimeout(() => setSuccess(null), 2000);
      return updated;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("myMedications");
    if (stored) {
      setMyMedications(JSON.parse(stored));
    }
    const sync = () => {
      const updated = localStorage.getItem("myMedications");
      if (updated) setMyMedications(JSON.parse(updated));
    };
    window.addEventListener("myMedicationsChanged", sync);
    return () => window.removeEventListener("myMedicationsChanged", sync);
  }, []);

  const profiles = [
    {
      username: "spacheliyska",
      display: "spacheliyska",
      avatar: "/avatars/spacheliyska.png",
    },
    { username: "user2", display: "user2", avatar: "/avatars/user2.png" },
    { username: "user3", display: "user3", avatar: "/avatars/user3.png" },
  ];

  return (
    <>
      <Navbar />
      <div className="medication-container">
        {success && <div className="success-strip">{success}</div>}
        <SearchBar
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <div className="card-container">
          {filteredData.length > 0
            ? filteredData.map((medicine: Medicine, idx: number) => {
                const avatarSrc = getAvatarSrc(medicine.title);
                return (
                  <Card
                    key={medicine.title + idx}
                    avatar={avatarSrc}
                    title={medicine.title}
                    composition={medicine.composition}
                    btnText="Добави"
                    sideEffects={medicine.sideEffects}
                    onRemove={undefined}
                    onClick={() => handleAdd(medicine)}
                  />
                );
              })
            : "Няма намерени лекарства"}
        </div>
        <div className="my-medications-list">
          <h3>Моите лекарства</h3>
          <ul>
            {myMedications.map((med, idx) => (
              <li key={med.title + idx}>{med.title}</li>
            ))}
          </ul>
        </div>
        <div className="profiles">
          <h3>Профили</h3>
          <ul>
            {profiles.map((profile) => (
              <li key={profile.username} className="profile-list-item">
                <a href={`/profile/${profile.username}`}>
                  <img
                    src={profile.avatar}
                    alt={profile.display}
                    className="profile-avatar"
                    onError={(e) =>
                      (e.currentTarget.src = "/avatars/default.png")
                    }
                  />
                  Профил на {profile.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
