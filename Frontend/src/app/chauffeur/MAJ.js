import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

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
    etat: "Pret",
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
    etat: "Pret",
  },
];

const categorie = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
];

export default function MAJ() {
  const { id } = useParams();
  const chauffeur = Chauffeurs.find((c) => c.id === parseInt(id));

  const dateObj = new Date(chauffeur.validite_permis);

  // Formater la date en une chaîne ISO 8601
  const validite_permis = dateObj.toISOString().split("T")[0];

  const cat = chauffeur.categories_permis;
  return (
    <div class="container-fluid pt-4 px-4">
      <ol class="breadcrumb bg-secondary p-2 rounded">
        <li class="breadcrumb-item">
          <a href="#">Chauffeurs</a>
        </li>
        <li class="breadcrumb-item active">Ajouter</li>
      </ol>
      <hr />
      <div class="card bg-secondary">
        <div class="card-header text-white">Ajouter Chauffeur</div>

        <div class="card-body p-4">
          <form method="POST">
            <div class="d-flex align-items-center gap-3">
              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Nom</label>
                <input
                  type="text"
                  class="form-control"
                  value={chauffeur.nom.split(" ")[0]}
                  id="exampleInputEmail1"
                  name="u_lname"
                />
              </div>
              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Prenom</label>
                <input
                  type="text"
                  value={chauffeur.nom.split(" ")[1]}
                  required
                  class="form-control"
                  id="exampleInputEmail1"
                  name="u_fname"
                />
              </div>
            </div>

            <div class="d-flex align-items-center gap-3">
              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Tel</label>
                <input
                  type="text"
                  class="form-control"
                  value={chauffeur.tel}
                  id="exampleInputEmail1"
                  name="u_phone"
                />
              </div>

              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Code Chauffeur</label>
                <input
                  type="text"
                  value={chauffeur.id}
                  class="form-control"
                  name="u_email"
                />
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="exampleInputEmail1">Adresse</label>
              <input
                type="text"
                class="form-control"
                value=""
                id="exampleInputEmail1"
                name="u_addr"
              />
            </div>

            <div class="d-flex align-items-center gap-3">
              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Date Naissance</label>
                <input
                  type="date"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="u_car_bookdate"
                />
              </div>
              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Date Recrutement</label>
                <input
                  type="date"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="u_car_bookdate"
                />
              </div>
            </div>

            <div class="d-flex align-items-center gap-3">
              <div class="form-group mb-3 w-50">
                <label for="exampleInputEmail1">Num Permis</label>
                <input
                  type="text"
                  class="form-control"
                  value={chauffeur.num_permis}
                  id="exampleInputEmail1"
                  name="num-permis"
                />

                <label for="exampleInputEmail1">Validite</label>
                <input
                  type="date"
                  class="form-control"
                  value={validite_permis}
                  id="exampleInputEmail1"
                  name="u_car_bookdate"
                />
              </div>

              <div className="form-group w-50">
                <select
                  className="form-select"
                  multiple
                  aria-label="multiple select example"
                  value={cat}
                >
                  <option disabled>Selectionner les Categories</option>
                  {categorie.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="exampleFormControlSelect1">Etat</label>
              <select
                class="form-select mb-3"
                name="u_car_book_status"
                id="exampleFormControlSelect1"
                value={chauffeur.etat}
              >
                <option value="">Etat</option>
                <option value="Pret">Pret</option>
                <option value="Non-Pret">Non-Pret</option>
              </select>
            </div>
            <div class="d-flex justify-content-between">
              <button type="submit" name="book_vehicle" class="btn btn-success">
                Confirmer
              </button>
              <button type="reset" name="chauffeur" class="btn btn-warning">
                Reinitialiser
              </button>
            </div>
          </form>
          <hr />

          <form action="">
            <h6 class="mb-4">Categories Permis</h6>

            <div class="d-flex flex-md-column">
              <div class="form-group mb-3 d-flex gap-3">
                <div class="form-group w-50">
                  <label for="exampleFormControlSelect1">Categorie</label>
                  <select
                    class="form-select mb-3"
                    name="u_car_book_status"
                    id=""
                  >
                    <option>Nouvelle categorie</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </div>

                <div class="form-group mb-3 w-50">
                  <label for="exampleInputEmail1">Nouvelle Categorie</label>
                  <input
                    type="text"
                    class="form-control"
                    value=""
                    id="exampleInputEmail1"
                    name="u_addr"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-between">
                <button
                  type="submit"
                  name="book_vehicle"
                  class="btn btn-success"
                >
                  Confirmer
                </button>
                <button
                  type="submit"
                  name="book_vehicle"
                  class="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
