import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { Link } from "react-router-dom";
import Data from "../Data.json";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toastify } from "toastify";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

// const Vlist = [
//   {
//     id: 1,
//     matricule: "9876542234",
//     marque: "Fiat",
//     modele: "Panda",
//     typeCarburant: "Sans plomp",
//     categorie: "B",
//     nbrPassagersMax: 3,
//     controleTechnique: "12-12-2023",
//     etat: "pret",
//   },
//   {
//     id: 2,
//     matricule: "4534234456",
//     marque: "Volswagen",
//     modele: "Golf",
//     typeCarburant: "Gazoil",
//     categorie: "B",
//     nbrPassagersMax: 4,
//     controleTechnique: "12-12-2023",
//     etat: "nonpret",
//   },
//   {
//     id: 3,
//     matricule: "4534234456",
//     marque: "Volswagen",
//     modele: "Polo",
//     typeCarburant: "Escence",
//     categorie: "B",
//     nbrPassagersMax: 4,
//     controleTechnique: "02-12-2023",
//     etat: "pret",
//   },
// ];

//data
const ListeVehicule = Data.Vehicules;
const Listemarque = Data.marque;
const Listemodele = Data.modele;
const ListeTypeCarburant = Data.Type_Carburant;
const Listecategorie = Data.Categories_permis;
const ListeEtatVehicule = Data.etatV;

export default function Infos() {
  const { id } = useParams();
  const vehicule = ListeVehicule.find((v) => v.id === parseInt(id));
  return (
    <div class="card-body">
      <h5 class="card-title text-white">Voiture {vehicule.id}</h5>
      <p class="card-text">Matricule : {vehicule.matricule}</p>
      <p class="card-text">Marque : {vehicule.marque}</p>
      <p class="card-text">Modèle : {vehicule.modele}</p>
      <p class="card-text">Type de carburant : {vehicule.typecarburant}</p>
      <p class="card-text">Catégorie : {vehicule.categories}</p>
      <p class="card-text">
        Nombre de passagers max : {vehicule.nombreplacemax}
      </p>
      <p class="card-text">
        Controle technique : {vehicule.datecontroleTechnique}
      </p>
      <p class="card-text">Date Assurance : {vehicule.dateassurance}</p>
      <p class="card-text">Etat : {vehicule.etat}</p>
      <hr></hr>
      <button className="btn">
        <Link
          to={`/vehicule/Gerer/${vehicule.id}/MAJ`}
          className="badge bg-info"
        >
          Mettre a jour
        </Link>
      </button>
    </div>
  );
}
