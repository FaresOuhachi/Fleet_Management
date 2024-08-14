import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const Chauffeurs = [
  {
    id: 1,
    nom: "Teboune AbdelMadjid",
    tel: "0698765645",
    num_permis: "0987654",
    categories_permis: ["A", "B", "C"],
    validite_permis: "12-12-2012",
    etat: "Pret",
  },
  {
    id: 2,
    nom: "Monkey D.Luffy",
    tel: "0698765645",
    num_permis: "89765789",
    categories_permis: ["B", "C"],
    validite_permis: "22-03-2023",
    etat: "Non-Pret",
  },
  {
    id: 3,
    nom: "Nami",
    tel: "0678909876",
    num_permis: "56437892",
    categories_permis: ["A", "B"],
    validite_permis: "01-05-2024",
    etat: "Pret",
  },
  {
    id: 4,
    nom: "Sanji",
    tel: "0645789367",
    num_permis: "24569873",
    categories_permis: ["B", "C", "D"],
    validite_permis: "14-07-2022",
    etat: "Non-Pret",
  },
  {
    id: 5,
    nom: "Usopp",
    tel: "0678567890",
    num_permis: "45879236",
    categories_permis: ["A", "B", "C", "D"],
    validite_permis: "19-09-2025",
    etat: "Pret",
  },
];

export default function Consulter() {
  const { id } = useParams();
  const chauffeur = Chauffeurs.find((m) => m.id === parseInt(id));

  if (!chauffeur) {
    return <h1>Le chauffeur avec ID {id} n'existe pas.</h1>;
  }
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="vh-100">
        <ol className="breadcrumb bg-secondary p-2 rounded">
          <li className="breadcrumb-item">
            <span className="textprimary">Chauffeurs</span>
          </li>
          <li className="breadcrumb-item active">Consulter</li>
        </ol>

        <hr />

        <div class="card bg-secondary">
          <div className="card-header navbar ">
            <Link
              to={`/chauffeur/${chauffeur.id}/Graphs`}
              className="textprimary"
            >
              <i className="fas fa-table me-2"></i>Graphs
            </Link>
            <Link
              to={`/chauffeur/${chauffeur.id}/Infos`}
              className="textprimary"
            >
              <i className="fas fa-table me-2"></i>Infos
            </Link>
            <Link
              to={`/chauffeur/${chauffeur.id}/Mission`}
              className="textprimary"
            >
              <i className="fas fa-table me-2"></i>Missions
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
