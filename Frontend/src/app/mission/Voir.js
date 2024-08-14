import React from "react";
import { Link } from "react-router-dom";
import Data from "../Data.json";
import Select from "react-select";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toastify } from "toastify";
import { useEffect } from "react";
import * as Yup from "yup";

import { useMutation } from "react-query";
import axios from "axios";

// const Missions = [
//   {
//     id: "01",
//     demandeur: "MisterV",
//     tel: "0698765645",
//     vehicule: "Fiat Panda",
//     matriculeVehicule: "43563312365",
//     dateMission: "12-12-2012",
//     status: "Approuver",
//   },
//   {
//     id: "02",
//     demandeur: "Son goku",
//     tel: "0698765645",
//     vehicule: "Nuage Magique",
//     matriculeVehicule: "43563312365",
//     dateMission: "03-02-2020",
//     status: "En attente",
//   },
//   {
//     id: "03",
//     demandeur: "Monkey D.Luffy",
//     tel: "0698765645",
//     vehicule: "Sunny",
//     matriculeVehicule: "43563312365",
//     dateMission: "22-03-2023",
//     status: "Refusé",
//   },
//   {
//     id: "04",
//     demandeur: "Natsu Dragneel",
//     tel: "0698765645",
//     vehicule: "Fire Dragon",
//     matriculeVehicule: "43563312365",
//     dateMission: "01-01-2022",
//     status: "En attente",
//   },
//   {
//     id: "05",
//     demandeur: "Uzumaki Naruto",
//     tel: "0698765645",
//     vehicule: "Kyubi",
//     matriculeVehicule: "43563312365",
//     dateMission: "15-08-2023",
//     status: "Approuver",
//   },
//   {
//     id: "06",
//     demandeur: "Tony Stark",
//     tel: "0698765645",
//     vehicule: "Iron Man Suit",
//     matriculeVehicule: "43563312365",
//     dateMission: "30-06-2022",
//     status: "Refusé",
//   },
// ];
const ListeMission = Data.Missions;
const ListeChauffeur = Data.Chauffeurs;
const ListeVehicule = Data.Vehicules;
const Listemarque = Data.marque;
const Listemodele = Data.modele;
const ListeTypeCarburant = Data.Type_Carburant;
const Listecategorie = Data.Categories_permis;
const ListeEtatVehicule = Data.etatV;

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
              <th>Destination</th>
              <th>Date Missions</th>
              <th>Personne</th>

              <th>Vehicules</th>
              <th>Matricule Vehicules</th>

              <th>Chauffeur</th>
              <th>Carte Naftal</th>

              <th>Bon Vrac</th>

              <th>Status</th>
              <th>Consulter</th>
            </tr>
          </thead>

          <tbody>
            {ListeMission.map((mission) => {
              return (
                <tr>
                  <td>{mission.id}</td>
                  <td>
                    {mission.nom} {mission.prenom}
                  </td>
                  <td>{mission.tel}</td>
                  <td>
                    {mission.wilaya} {mission.destination}
                  </td>{" "}
                  <td>{mission.date_debut_mission}</td>
                  <td>{mission.nombre_personne}</td>
                  <td>
                    {mission.marque} {mission.modele}
                  </td>
                  <td>{mission.matricule}</td>
                  <td>
                    {mission.nomc} {mission.prenomc}
                  </td>
                  <td>{mission.carte_naftal}</td>
                  <td>{mission.nombre_bon_Vrac}</td>
                  <td>
                    <span
                      className={`badge ${
                        mission.etatmission === "Approuver"
                          ? "badge-success"
                          : mission.etatmission === "En-Attente"
                          ? "badge-warning"
                          : "badge-danger"
                      }`}
                    >
                      {mission.etatmission}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/mission/${mission.id}/Graphs`}
                      class="badge bg-info text-decoration-none text-white"
                    >
                      <i class="fa fa-check"></i>Consulter
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
