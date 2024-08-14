import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Vlist = [
  {
    id: 1,
    matricule: "9876542234",
    marque: "Fiat",
    modele: "Panda",
    typeCarburant: "Sans plomp",
    categorie: "B",
    nbrPassagersMax: 3,
    controleTechnique: "12-12-2023",
    etat: "pret",
  },
  {
    id: 2,
    matricule: "4534234456",
    marque: "Volswagen",
    modele: "Golf",
    typeCarburant: "Gazoil",
    categorie: "B",
    nbrPassagersMax: 4,
    controleTechnique: "12-12-2023",
    etat: "nonpret",
  },
  {
    id: 3,
    matricule: "4534234456",
    marque: "Volswagen",
    modele: "Polo",
    typeCarburant: "Escence",
    categorie: "B",
    nbrPassagersMax: 4,
    controleTechnique: "02-12-2023",
    etat: "pret",
  },
];

export default function Consulter() {
  const { id } = useParams();
  const vehicule = Vlist.find((v) => v.id === parseInt(id));

  if (!vehicule) {
    return <div>Le véhicule avec ID {id} n'existe pas.</div>;
  }
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="vh-100">
        <ol className="breadcrumb bg-secondary p-2 rounded">
          <li className="breadcrumb-item">
            <span className="textprimary">Vehicules</span>
          </li>
          <li className="breadcrumb-item active">Consulter</li>
        </ol>

        <hr />

        <div class="card bg-secondary">
          <div className="card-header navbar ">
            <Link
              to={`/vehicule/${vehicule.id}/Graphs`}
              className="textprimary"
            >
              <i className="fas fa-table me-2"></i>Graphs
            </Link>
            <Link to={`/vehicule/${vehicule.id}/Infos`} className="textprimary">
              <i className="fas fa-table me-2"></i>Consulter Infos
            </Link>
            <Link
              to={`/vehicule/${vehicule.id}/Mission`}
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
