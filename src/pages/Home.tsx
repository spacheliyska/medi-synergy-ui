import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import paracetamol from "../assets/paracetamol.jpg";
import { getAllApi } from "../hooks/getAllApi";
import Medicine from "../models/Medicine";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const [data, setData] = useState<Medicine[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [myMedications, setMyMedications] = useState<Medicine[]>([]);

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
        return prev; // Already added
      }
      return [...prev, medicine];
    });
  };

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
                  onRemove={undefined}
                  onClick={() => handleAdd(medicine)}
                />
              ))
            : "Няма намерени лекарства"}
        </div>
        {/* Example: Show my medications below */}
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
