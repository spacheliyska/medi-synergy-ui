import React from "react";
import Card from "../components/Card";
import "../styles/MyMedications.css";
import paracetamol from "../assets/paracetamol.jpg";
import analgin from "../assets/analgin.png";
import aulin from "../assets/aulin.jpg";
import SearchBar from "../components/SearchBar";

const MyMedications = () => {
  return (
    <div className="medication-container">
      <SearchBar></SearchBar>
      <div className="card-container">
        <Card
          avatar={paracetamol}
          title={"Парацетамакс 500мг"}
          composition={
            "Парацетамолът се използва като аналгетик и антипиретик. Той е предпочитаната алтернативеа на аспирин, особено при пациенти с нарушения на кръвосъсирването, лица с анамнеза за пептична язва или които не понасят аспирин, както и при деца."
          }
          btnText="Премахни"
          sideEffects={["Главоболие", "Гадене", "Опънатост"]}
        ></Card>
        <Card
          avatar={analgin}
          title={"Аналгин 500мг"}
          composition="Аналгин е обезболяващ лекарствен продукт, който се използва за повлияване на болков синдром от различен произход: зъбобол, невралгии, неврити, миалгии, травми, изгаряния, следперативни болки, фантомна болка, бъбречни и жлъчни колики и главоболие."
          btnText="Премахни"
          sideEffects={["Главоболие", "Гадене", "Опънатост"]}
        ></Card>
        <Card
          avatar={aulin}
          title={"Аулин 100мг"}
          composition="Аулин е нестероидно противовъзпалително лекарство с болкоуспокояващи свойства. Прилага се за лечение на остра болка и за лечение на менструални болки. Преди да ви предпише Аулин, Вашият доктор ще направи преценка за ползата от това лекарство за Вас и риска от развитие на нежелани лекарствени реакции."
          btnText="Премахни"
          sideEffects={["Главоболие", "Гадене", "Опънатост"]}
        ></Card>
      </div>
    </div>
  );
};

export default MyMedications;
