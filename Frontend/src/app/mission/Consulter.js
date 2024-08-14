import React from "react";
import { Link, Outlet } from "react-router-dom";
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

export default function Consulter() {
  const { id } = useParams();
  const mission = Missions.find((m) => m.id === id);

  if (!mission) {
    return <h1>La mission avec ID {id} n'existe pas.</h1>;
  }
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="vh-100">
        <ol className="breadcrumb bg-secondary p-2 rounded">
          <li className="breadcrumb-item">
            <span className="textprimary">Missions</span>
          </li>
          <li className="breadcrumb-item active">Consulter</li>
        </ol>

        <hr />

        <div class="card bg-secondary">
          <div className="card-header navbar ">
            <Link to={`/mission/${mission.id}/Graphs`} className="textprimary">
              <i className="fas fa-table me-2"></i>Graphs
            </Link>
            <Link to={`/mission/${mission.id}/Infos`} className="textprimary">
              <i className="fas fa-table me-2"></i>Consulter Infos
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
