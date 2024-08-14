import React from "react";
import { Link } from "react-router-dom";

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

export default function Voir() {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="vh-100">
        <ol className="breadcrumb bg-secondary p-2 rounded">
          <li className="breadcrumb-item">
            <span className="textprimary">Missions</span>
          </li>
          <li className="breadcrumb-item active">Voir</li>
        </ol>
        <hr />

        <div className="card bg-secondary h-75 text-white">
          <div className="card-header">
            <i className="fas fa-table me-2"></i>Voir Missions
          </div>

          <TableauVoirMission />
          <div className="card-footer small text-muted">
            <span>Mis a jour le : 05-03-2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableauVoirMission() {
  return (
    <div className="card-body">
      <div className="table-responsive">
        <table className="table text-start align-middle table-bordered table-hover mb-0">
          <thead>
            <tr className="text-white">
              <th>#</th>
              <th>Demandeurs</th>
              <th>Tels</th>
              <th>Vehicules</th>
              <th>Matricule Vehicules</th>
              <th>Date Missions</th>
              <th>Status</th>
              <th>Consulter</th>
            </tr>
          </thead>

          <tbody>
            {Chauffeurs.map((chauffeur) => (
              <tr key={chauffeur.id}>
                <td>{chauffeur.id}</td>
                <td>{chauffeur.nom}</td>
                <td>{chauffeur.tel}</td>
                <td>{chauffeur.num_permis}</td>
                <td>{chauffeur.categories_permis.join(", ")}</td>
                <td>{chauffeur.validite_permis}</td>
                <td>
                  <span
                    className={
                      chauffeur.etat === "Pret"
                        ? "badge badge-success"
                        : "badge badge-danger"
                    }
                  >
                    {chauffeur.etat}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/chauffeur/${chauffeur.id}/Graphs`}
                    className="badge bg-info text-decoration-none text-white"
                  >
                    <i className="fa fa-check"></i>Consulter
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
