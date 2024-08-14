import React from "react";
import { Link } from "react-router-dom";

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

export default function Gerer() {
  return (
    <div class="container-fluid pt-4 px-4">
      <div class="vh-100">
        <ol class="breadcrumb bg-secondary p-2 rounded">
          <li class="breadcrumb-item">
            <span>Missions</span>
          </li>
          <li class="breadcrumb-item active">Gerer</li>
        </ol>
        <hr />

        <div class="card bg-secondary h-75">
          <div class="card-header text-white">
            <i class="fas fa-table me-2"></i>Gerer Missions
          </div>

          <div class="card-body">
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
                      <input className="form-check-input" type="checkbox" />
                    </th>
                    <th>#</th>
                    <th>Noms</th>
                    <th>Tels</th>
                    <th>Vehicules</th>
                    <th>Matricule Vehicules</th>
                    <th>Date Missions</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {Missions.map((mission) => (
                    <tr key={mission.id}>
                      <td>
                        <input className="form-check-input" type="checkbox" />
                      </td>
                      <td>{mission.id}</td>
                      <td>{mission.demandeur}</td>
                      <td>{mission.tel}</td>
                      <td>{mission.vehicule}</td>
                      <td>{mission.matriculeVehicule}</td>
                      <td>{mission.dateMission}</td>
                      <select
                        className="form-select-sm bg-secondary border-0 text-white"
                        name=""
                        id=""
                        value={mission.status}
                      >
                        <option value="Approuver">
                          <span className="badge badge-success">Approuver</span>
                        </option>
                        <option value="En attente">
                          <span className="badge badge-danger">En attente</span>
                        </option>{" "}
                        <option value="Refusé">
                          <span className="badge badge-danger">Refusé</span>
                        </option>
                      </select>
                      <td>
                        <Link
                          to={`/mission/Gerer/${mission.id}/MAJ`}
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
