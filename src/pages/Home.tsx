import React from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import paracetamol from "../assets/paracetamol.jpg";
import analgin from "../assets/analgin.png";
import aulin from "../assets/aulin.jpg";

const Home = () => {
  return (
    <div className="medication-container">
      <SearchBar></SearchBar>
      <div className="card-container">
        <Card
          avatar={paracetamol}
          title={"Парацетамакс 500мг"}
          description={
            "Парацетамолът се използва като аналгетик и антипиретик. Той е предпочитаната алтернативеа на аспирин, особено при пациенти с нарушения на кръвосъсирването, лица с анамнеза за пептична язва или които не понасят аспирин, както и при деца."
          }
          btnText="Добави"
        ></Card>
        <Card
          avatar={analgin}
          title={"Аналгин 500мг"}
          description="Аналгин е обезболяващ лекарствен продукт, който се използва за повлияване на болков синдром от различен произход: зъбобол, невралгии, неврити, миалгии, травми, изгаряния, следперативни болки, фантомна болка, бъбречни и жлъчни колики и главоболие."
          btnText="Добави"
        ></Card>
        <Card
          avatar={aulin}
          title={"Аулин 100мг"}
          description="Аулин е нестероидно противовъзпалително лекарство с болкоуспокояващи свойства. Прилага се за лечение на остра болка и за лечение на менструални болки. Преди да ви предпише Аулин, Вашият доктор ще направи преценка за ползата от това лекарство за Вас и риска от развитие на нежелани лекарствени реакции."
          btnText="Добави"
        ></Card>
      </div>
    </div>
  );
};

export default Home;
