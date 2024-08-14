import React from "react";
import { useParams } from "react-router-dom";

const Missions = [
  {
    id: "01",
    demandeur: "MisterV",
    tel: "0698765645",
    vehicule: "Fiat Panda",
    matriculeVehicule: "43563312365",
    dateMission: "12-12-2012",
    status: "Approuver",
  },
  {
    id: "02",
    demandeur: "Son goku",
    tel: "0698765645",
    vehicule: "Nuage Magique",
    matriculeVehicule: "43563312365",
    dateMission: "03-02-2020",
    status: "En attente",
  },
  {
    id: "03",
    demandeur: "Monkey D.Luffy",
    tel: "0698765645",
    vehicule: "Sunny",
    matriculeVehicule: "43563312365",
    dateMission: "22-03-2023",
    status: "Refusé",
  },
  {
    id: "04",
    demandeur: "Natsu Dragneel",
    tel: "0698765645",
    vehicule: "Fire Dragon",
    matriculeVehicule: "43563312365",
    dateMission: "01-01-2022",
    status: "En attente",
  },
  {
    id: "05",
    demandeur: "Uzumaki Naruto",
    tel: "0698765645",
    vehicule: "Kyubi",
    matriculeVehicule: "43563312365",
    dateMission: "15-08-2023",
    status: "Approuver",
  },
  {
    id: "06",
    demandeur: "Tony Stark",
    tel: "0698765645",
    vehicule: "Iron Man Suit",
    matriculeVehicule: "43563312365",
    dateMission: "30-06-2022",
    status: "Refusé",
  },
];

export default function Infos() {
  const { id } = useParams();
  const mission = Missions.find((m) => m.id === id);
  return (
    <div class="card-body">
      <h5 class="card-title text-white">Mission {mission.id}</h5>
      <p class="card-text">Demandeur : {mission.demandeur}</p>
      <p class="card-text">Téléphone : {mission.tel}</p>
      <p class="card-text">Véhicule : {mission.vehicule}</p>
      <p class="card-text">Matricule Véhicule : {mission.matriculeVehicule}</p>
      <p class="card-text">Date Mission : {mission.dateMission}</p>
      <p class="card-text">Status : {mission.status}</p>
    </div>
  );
}
