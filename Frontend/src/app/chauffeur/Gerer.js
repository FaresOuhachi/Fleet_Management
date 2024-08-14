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
    nom: "test",
    tel: "0698765645",
    num_permis: "0987654",
    categories_permis: ["A", "B", "C"],
    validite_permis: "12-12-2012",
    etat: "Pret",
  },
  {
    id: 3,
    nom: "Nami",
    tel: "0678909876",
    num_permis: "56437892",
    categories_permis: ["A", "B"],
    validite_permis: "01-05-2024",
    etat: "Non-Pret",
  },
  {
    id: 4,
    nom: "testttt ttt",
    tel: "0678909876",
    num_permis: "56437892",
    categories_permis: ["A", "B"],
    validite_permis: "01-05-2024",
    etat: "Pret",
  },
  {
    id: 5,
    nom: "Ussop",
    tel: "987654",
    num_permis: "987654324",
    categories_permis: ["B", "D"],
    validite_permis: "02-04-2030",
    etat: "Non-Pret",
  },
];

export default function Gerer() {
  return (
    <div class="container-fluid pt-4 px-4">
      <div class="vh-100">
        <ol class="breadcrumb bg-secondary p-2 rounded">
          <li class="breadcrumb-item">
            <span>Chauffeurs</span>
          </li>
          <li class="breadcrumb-item active">Gerer</li>
        </ol>
        <hr />

        <div class="card bg-secondary h-75">
          <div class="card-header text-white">
            <i class="fas fa-table me-2"></i>Gerer Chauffeurs
          </div>

          <div class="card-body">
            <TableauGererChauffeur />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              name="book_vehicle"
              className="btn btn-success m-lg-4"
            >
              Confirmer
            </button>
            <button
              type="submit"
              name="book_vehicle"
              className="btn btn-danger m-lg-4"
            >
              Supprimer
            </button>
          </div>
          <div class="card-footer small text-muted">
            <span>Mis a jour le : 05-03-2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableauGererChauffeur() {
  return (
    <div class="table-responsive">
      <table
        class="table table-bordered table-striped table-hover"
        id="dataTable"
        width="100%"
        cellspacing="0"
      >
        <thead>
          <tr class="text-white">
            <th>
              <input class="form-check-input" type="checkbox" />
            </th>
            <th>#</th>
            <th>Chauffeurs</th>
            <th>Tels</th>
            <th>Num Permis</th>
            <th>Categories Permis</th>
            <th>Validite Permis</th>
            <th>Etats</th>
            <th>Consulter</th>
          </tr>
        </thead>

        <tbody>
          {Chauffeurs.map((chauffeur) => (
            <tr key={chauffeur.id}>
              <td>
                <input className="form-check-input" type="checkbox" />
              </td>
              <td>{chauffeur.id}</td>
              <td>{chauffeur.nom}</td>
              <td>{chauffeur.tel}</td>
              <td>{chauffeur.num_permis}</td>
              <td>{chauffeur.categories_permis.join(" , ")}</td>
              <td>{chauffeur.validite_permis}</td>
              <select
                className="form-select-sm bg-secondary border-0 text-white"
                name=""
                id=""
                value={chauffeur.etat}
              >
                <option value="Pret">
                  <span className="badge badge-success">Pret</span>
                </option>
                <option value="Non-Pret">
                  <span className="badge badge-danger">Non-Pret</span>
                </option>
              </select>
              <td>
                <Link
                  to={`/chauffeur/Gerer/${chauffeur.id}/MAJ`}
                  class="badge bg-info"
                >
                  <i class="fa fa-check"></i>Mettre a jour
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
