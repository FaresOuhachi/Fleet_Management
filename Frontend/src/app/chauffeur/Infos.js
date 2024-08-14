import React from "react";
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

export default function Infos() {
  const { id } = useParams();
  const chauffeur = Chauffeurs.find((c) => c.id === parseInt(id));
  return (
    <div class="card-body">
      <h5 class="card-title text-white">Chauffeur {chauffeur.id}</h5>
      <p class="card-text">Demandeur : {chauffeur.nom}</p>
      <p class="card-text">Téléphone : {chauffeur.tel}</p>
      <p class="card-text">Numéro de permis : {chauffeur.num_permis}</p>
      <p class="card-text">
        Catégories de permis : {chauffeur.categories_permis.join(", ")}
      </p>
      <p class="card-text">Validité du permis : {chauffeur.validite_permis}</p>
      <p class="card-text">Etat : {chauffeur.etat}</p>
    </div>
  );
}
