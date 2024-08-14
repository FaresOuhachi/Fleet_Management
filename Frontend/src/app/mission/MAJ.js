import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Missions = [
  {
    id: "01",
    demandeur: "MisterV",
    tel: "0698765645",
    destination: "France",
    vehicule: "Fiat Panda",
    matriculeVehicule: "43563312365",
    dateMission: "12-12-2012",
    typemission: "cargaison",
    motif: "Livraison de marchandise",
    status: "Approuver",
  },
  {
    id: "02",
    demandeur: "Son goku",
    tel: "0698765645",
    destination: "UK",
    vehicule: "Nuage Magique",
    matriculeVehicule: "43563312365",
    dateMission: "03-02-2020",
    typemission: "transport",
    motif: "Transport de personne",
    status: "En attente",
  },
  {
    id: "03",
    demandeur: "Monkey D.Luffy",
    tel: "0698765645",
    nbrpersonne: "5",
    destination: "Japon",
    vehicule: "Sunny",
    matriculeVehicule: "43563312365",
    dateMission: "03-02-2020",
    typemission: "cargaison",
    motif: "Livraison de marchandise",
    status: "Refusé",
  },
  {
    id: "04",
    demandeur: "Natsu Dragneel",
    tel: "0698765645",
    nbrpersonne: "2",
    destination: "USA",
    vehicule: "Fire Dragon",
    matriculeVehicule: "43563312365",
    dateMission: "03-02-2020",
    typemission: "transport",
    motif: "Transport de personne",
    status: "En attente",
  },
  {
    id: "05",
    demandeur: "Uzumaki Naruto",
    tel: "0698765645",
    nbrpersonne: "1",
    destination: "Dubai",
    vehicule: "Kyubi",
    matriculeVehicule: "43563312365",
    dateMission: "03-02-2020",
    typemission: "transport",
    motif: "Transport de personne",
    status: "Approuver",
  },
  {
    id: "06",
    demandeur: "Tony Stark",
    tel: "0698765645",
    nbrpersonne: "6",
    destination: "ESPAGNE",
    vehicule: "Iron Man Suit",
    matriculeVehicule: "43563312365",
    dateMission: "03-02-2020",
    typemission: "cargaison",
    motif: "Livraison de marchandise",
    status: "Refusé",
  },
];

export default function Ajouter() {
  return (
    <div className="container-fluid pt-4 px-4">
      <ol className="breadcrumb bg-secondary p-2 rounded">
        <li className="breadcrumb-item">
          <span className="textprimary">Missions</span>
        </li>
        <li className="breadcrumb-item active">Ajouter</li>
      </ol>
      <hr />
      <div className="card bg-secondary">
        <div className="card-header text-white">Ajouter Missions</div>

        <div className="card-body p-4">
          <FormMAJMission />
        </div>
      </div>
    </div>
  );
}

export function FormMAJMission() {
  const { id } = useParams();
  const mission = Missions.find((m) => m.id === id);
  const dateObj = new Date(mission.dateMission);
  // Formater la date en une chaîne ISO 8601
  const dateMission = dateObj.toISOString().split("T")[0];
  return (
    <form method="POST">
      <h6 className="mb-3">Demandeur</h6>
      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Nom</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="u_lname"
            value={mission.demandeur.split(" ")[0]}
          />
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Prenom</label>
          <input
            type="text"
            value={mission.demandeur.split(" ")[1]}
            required
            className="form-control"
            id="exampleInputEmail1"
            name="u_fname"
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Tel</label>
          <input
            type="text"
            className="form-control"
            value={mission.tel}
            id="exampleInputEmail1"
            name="u_phone"
          />
        </div>

        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={mission.email}
            className="form-control"
            name="u_email"
          />
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Distination</label>
          <input
            type="text"
            className="form-control"
            value={mission.destination}
            id="exampleInputEmail1"
            name="u_addr"
          />
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Wilaya</label>
          <input
            type="text"
            className="form-control"
            value=""
            id="exampleInputEmail1"
            name="u_addr"
          />
        </div>
      </div>

      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0 w-25">Bagages</legend>
        <div className="col-sm-10 w-75 d-flex justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios1"
              value="option1"
              checked=""
            />
            <label className="form-check-label" for="gridRadios2">
              Petit
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios2"
              value="option2"
              checked=""
            />
            <label className="form-check-label" for="gridRadios3">
              Moyen
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gridRadios"
              id="gridRadios3"
              value="option3"
            />
            <label className="form-check-label" for="gridRadios2">
              Grand
            </label>
          </div>
        </div>
      </fieldset>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Date Debut Mission</label>
          <input
            type="date"
            className="form-control"
            id="exampleInputEmail1"
            name="u_car_bookdate"
            value={dateMission}
          />
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Date Fin Mission</label>
          <input
            type="date"
            className="form-control"
            id="exampleInputEmail1"
            name="u_car_bookdate"
            value={dateMission}
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="">Type Vehicule</label>
          <select className="form-select" name="u_car_book_status" id="">
            <option value="">Selectionner Type</option>
            <option>Transport</option>
            <option>Cargaison</option>
          </select>
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Nombre de Personnes</label>
          <input
            type="number"
            min="1"
            max="50"
            className="form-control"
            value={mission.nbPersonnes}
            id="exampleInputEmail1"
            name=""
          />
        </div>
      </div>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea4"
          style={{ height: "161px" }}
          value={mission.motif}
        ></textarea>
        <label for="floatingTextarea4">Motif</label>
      </div>

      <hr />

      <h6 className="mb-3">Vehicule</h6>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="">Marque</label>
          <select className="form-select mb-3" name="u_car_book_status" id="">
            <option value="">Selectionner Marque</option>
            <option>Volkswagen</option>
            <option>Audi</option>
          </select>
        </div>
        <div className="form-group w-50">
          <label for="">Modele</label>
          <select className="form-select mb-3" name="u_car_book_status" id="">
            <option value="">Selectionner Modele</option>
            <option>polo</option>
            <option>Golf</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label for="">Matricule</label>
        <select className="form-select mb-3" name="u_car_book_status" id="">
          <option value="">Selectionner Matricule</option>
        </select>
      </div>

      <hr />

      <h6 className="mb-3">Chauffeur</h6>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="">Nom</label>
          <select className="form-select mb-3" name="u_car_book_status" id="">
            <option value="">Selectionner Nom</option>
            <option>Luffy</option>
          </select>
        </div>
        <div className="form-group w-50">
          <label for="">Prenom</label>
          <select className="form-select mb-3" name="u_car_book_status" id="">
            <option value="">Selectionner Prenom</option>
            <option>Luffy</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label for="">Code Chauffeur</label>
        <select className="form-select mb-3" name="u_car_book_status" id="">
          <option value="">Selectionner Code Chauffeur</option>
          <option>24567</option>
          <option>57877</option>
        </select>
      </div>

      <hr />

      <h6 className="mb-3">Carte Naftal et Bon Vrac</h6>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="">Carte Naftal</label>
          <select className="form-select mb-3" name="u_car_book_status" id="">
            <option value="">Selectionner Carte Naftal</option>
            <option>89786756</option>
            <option>54354657</option>
          </select>
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Nombre de Bon Vrac </label>
          <input
            type="number"
            min="0"
            max="99"
            className="form-control"
            value=""
            id="exampleInputEmail1"
            name=""
          />
        </div>
      </div>

      <hr />

      <div className="form-group">
        <label for="exampleFormControlSelect1">Etat Mission</label>
        <select
          className="form-select mb-3"
          name="u_car_book_status"
          id="exampleFormControlSelect1"
          value={mission.etatMission}
        >
          <option value="">Selectionner Etat Mission</option>
          <option value="Approuver">Approuver</option>
          <option value="En attente">En Attente</option>
          <option value="Refusé">Refuse</option>
        </select>
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" name="book_vehicle" className="btn btn-success">
          Confirmer
        </button>
        <button type="reset" name="chauffeur" className="btn btn-warning">
          Reinitialiser
        </button>
      </div>
    </form>
  );
}
