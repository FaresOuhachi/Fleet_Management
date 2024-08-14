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
import Select from "react-select";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  useCreateVehicle,
  useFetchVehicles,
  useUpdateVehicle,
  useSearchVehicles,
  UseAdvancedSearchVehicles,
} from "../actions/actionvehicule";
import { FaSearch } from "react-icons/fa";
//

//

//data
 const ListeVehicule = Data.Vehicules;
const Listemarque = Data.marque;
const Listemodele = Data.modele;
const ListeTypeCarburant = Data.Type_Carburant;
const Listecategorie = Data.Categories_permis;

const ListeEtatVehicule = Data.etatV;

//

//

//

//

//

//

//

export function AjouterForm() {
  //

  const createVehicleMutation = useCreateVehicle();
  //

  //

  //

  const validationSchema = Yup.object().shape({
    matricule: Yup.string().required("Le champ Matricule est requis"),
    modele: Yup.string().required("Le champ Modèle est requis"),
    marque: Yup.string().required("Le champ Marque est requis"),
    etatvehicule: Yup.string().required("Le champ Etat est requis"),
    // Autres règles de validation pour les autres champs
  });
  const formikvehicule = useFormik({
    initialValues: {
      matricule: "",
      marque: "",
      modele: "",
      typedetransport: "",
      nombreplacemax: "",
      capacitebagages: "",
      typecarburant: "",
      categories: "",
      dateassurance: "",
      datectrltechnique: "",
      etatvehicule: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!values.matricule) {
        toast.error("Veuillez entrer un matricule.");
      } else if (
        ListeVehicule.some((item) => item.matricule === values.matricule)
      ) {
        toast.error("Ce matricule existe déjà.");
        setSubmitting(false); // Pour définir le formulaire en état non soumis
      } else {
        alert(JSON.stringify(values, null, 2));
        // createVehicleMutation.mutate(values);
        toast.success(
          "Le vehicule avec le maticule " +
            values.matricule +
            " à était ajoutée avec succès !"
        );
        handleReset();
      }
    },
  });

  const handleReset = () => {
    formikvehicule.resetForm();
  };

  //

  //

  //

  //options select

  const marqueOptions = Listemarque.map((marque) => ({
    value: marque.name,
    label: marque.name,
  }));

  const modeleFiltered = Listemodele.filter(
    (item) => item.marque === formikvehicule.values.marque
  );
  const modeleOptions = modeleFiltered.map((modele) => ({
    value: modele.name,
    label: modele.name,
  }));

  const typeOptions = [
    { value: "cargaison", label: "Cargaison" },
    { value: "transport", label: "Transport" },
  ];

  const carburantOptions = ListeTypeCarburant.map((Carburant) => ({
    value: Carburant.name,
    label: Carburant.name,
  }));

  const categorieOptions = Listecategorie.map((categorie) => ({
    value: categorie.name,
    label: categorie.name,
  }));

  const optionsetat = ListeEtatVehicule.map((e) => ({
    value: e.name,
    label: e.name,
  }));

  //

  //

  //

  //

  //

  //

  return (
    <form method="POST" onSubmit={formikvehicule.handleSubmit}>
      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="">Matricule</label>
          <input
            type="text"
            className="form-control"
            value={formikvehicule.values.matricule}
            id=""
            name="matricule"
            onChange={formikvehicule.handleChange}
          />
        </div>
        <div className="form-group w-50">
          <label for="">Marque</label>

          <Select
            id=""
            name="marque"
            className="bg-secondary mb-3"
            options={marqueOptions}
            value={
              formikvehicule.values.marque
                ? marqueOptions.find(
                    (option) => option.value === formikvehicule.values.marque
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) => {
              formikvehicule.setFieldValue(
                "marque",
                selectedOption ? selectedOption.value : ""
              );

              // Réinitialiser la valeur du modèle lorsque la marque est modifiée
              formikvehicule.setFieldValue("modele", "");
            }}
          />
        </div>
        <div className="form-group w-50">
          <label for="">Modele</label>

          <Select
            id=""
            name="modele"
            className="bg-secondary mb-3"
            options={modeleOptions}
            value={
              formikvehicule.values.modele
                ? modeleOptions.find(
                    (option) => option.value === formikvehicule.values.modele
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "modele",
                selectedOption ? selectedOption.value : ""
              )
            }
            isDisabled={!formikvehicule.values.marque}
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="typedetransport">Type</label>
          <Select
            id="typedetransport"
            name="typedetransport"
            className=" mb-3"
            options={typeOptions}
            value={
              formikvehicule.values.typedetransport
                ? typeOptions.find(
                    (option) =>
                      option.value === formikvehicule.values.typedetransport
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "typedetransport",
                selectedOption ? selectedOption.value : ""
              )
            }
            isClearable
          />
        </div>

        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Nombre de place Max</label>
          <input
            type="number"
            min="1"
            max="50"
            className="form-control"
            value={formikvehicule.values.nombreplacemax}
            id="nombreplacemax"
            name="nombreplacemax"
            onChange={formikvehicule.handleChange}
          />
        </div>
      </div>

      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0 w-25">
          Capacite bagages
        </legend>
        <div className="col-sm-10 w-75 d-flex justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="capacitebagages"
              id="petite"
              value="petite"
              checked={formikvehicule.values.capacitebagages === "petite"}
              onChange={formikvehicule.handleChange}
            />
            <label className="form-check-label" htmlFor="petite">
              Petite
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="capacitebagages"
              id="moyenne"
              value="moyenne"
              checked={formikvehicule.values.capacitebagages === "moyenne"}
              onChange={formikvehicule.handleChange}
            />
            <label className="form-check-label" htmlFor="moyenne">
              Moyenne
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="capacitebagages"
              id="grande"
              value="grande"
              checked={formikvehicule.values.capacitebagages === "grande"}
              onChange={formikvehicule.handleChange}
            />
            <label className="form-check-label" htmlFor="grande">
              Grande
            </label>
          </div>
        </div>
      </fieldset>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="typecarburant">Type Carburant</label>

          <Select
            id="typecarburant"
            name="typecarburant"
            className=" mb-3"
            options={carburantOptions}
            value={
              formikvehicule.values.typecarburant
                ? carburantOptions.find(
                    (option) =>
                      option.value === formikvehicule.values.typecarburant
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "typecarburant",
                selectedOption ? selectedOption.value : ""
              )
            }
            isClearable
          />
        </div>

        <div className="form-group w-50">
          <label for="categories">Categorie</label>
          <Select
            id="categories"
            name="categories"
            className=" mb-3"
            options={categorieOptions}
            value={
              formikvehicule.values.categories
                ? categorieOptions.find(
                    (option) =>
                      option.value === formikvehicule.values.categories
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "categories",
                selectedOption ? selectedOption.value : ""
              )
            }
            isClearable
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Assurance</label>
          <input
            type="date"
            className="form-control"
            id="dateassurance"
            name="dateassurance"
            value={formikvehicule.values.dateassurance}
            onChange={formikvehicule.handleChange}
          />
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Controle Technique</label>
          <input
            type="date"
            className="form-control"
            id="datectrltechnique"
            name="datectrltechnique"
            value={formikvehicule.values.datectrltechnique}
            onChange={formikvehicule.handleChange}
          />
        </div>
      </div>

      <hr />

      <div className="form-group">
        <label for="etatvehicule">Etat</label>

        <Select
          id="etatvehicule"
          name="etatvehicule"
          className=" mb-3"
          options={optionsetat}
          value={
            formikvehicule.values.etatvehicule
              ? optionsetat.find(
                  (option) =>
                    option.value === formikvehicule.values.etatvehicule
                )
              : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
          }
          onChange={(selectedOption) =>
            formikvehicule.setFieldValue(
              "etatvehicule",
              selectedOption ? selectedOption.value : ""
            )
          }
          isClearable
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" name="submitvehicule" class="btn btn-success">
          Confirmer
        </button>
        <button
          type="reset"
          onClick={handleReset}
          name="resetvehicule"
          class="btn btn-warning"
        >
          Reinitialiser
        </button>
      </div>
    </form>
    //

    //

    //
  );

  //

  //

  //
}

//

//

//

export function MAJForm() {
  //
  const { id } = useParams();
  //

  //recuperer les donnees depuis le backend

  const { data: vehicles, isLoading, isError } = useFetchVehicles(); // changer le nom de la variable vehicles
  const updateVehicleMutation = useUpdateVehicle();

  //

  //

  //

  //recuperer l'id de l'url

  const vehicule = ListeVehicule.find((v) => v.id === parseInt(id));
  //

  //

  const handleSubmit = async (values) => {
    try {
      // Appeler la mutation pour mettre à jour le véhicule
      await updateVehicleMutation.mutateAsync(values);

      // Afficher une notification ou effectuer une autre action en cas de réussite
      toast.success("Mise à jour du véhicule réussie");
    } catch (error) {
      // Afficher une notification ou effectuer une autre action en cas d'échec
      toast.error("Échec de la mise à jour du véhicule");
    }
  };

  //
  const initialValues = {
    matricule: vehicule.matricule,
    marque: vehicule.marque,
    modele: vehicule.modele,
    typedetransport: vehicule.typedetransport,
    nombreplacemax: vehicule.nombreplacemax,
    capacitebagages: vehicule.capacitebagages,
    typecarburant: vehicule.typecarburant,
    categories: vehicule.categories,
    dateassurance: vehicule.dateassurance,
    datectrltechnique: vehicule.datecontroleTechnique,
    etatvehicule: vehicule.etat,
  };
  //

  const validationSchema = Yup.object().shape({
    // matricule: Yup.string().required("Le champ Matricule est requis"),
    // modele: Yup.string().required("Le champ Modèle est requis"),
    // marque: Yup.string().required("Le champ Marque est requis"),
    // etatvehicule: Yup.string().required("Le champ Etat est requis"),
    // Autres règles de validation pour les autres champs
  });
  const formikvehicule = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!values.matricule) {
        toast.error("Veuillez entrer un matricule.");
        setSubmitting(false);
      } else if (!values.marque && !values.modele && !values.etatvehicule) {
        toast.error(
          "Veuillez entrer les informations suivantes : Marque, Modele, Etat"
        );
        setSubmitting(false); // Pour définir le formulaire en état non soumis
      } else {
        alert(JSON.stringify(values, null, 2));
        toast.success(
          "Le vehicule" +
            values.marque +
            " " +
            values.modele +
            " avec le maticule " +
            values.matricule +
            " à était mise à jour avec succès !"
        );
        handleSubmit();
      }
    },
  });

  //

  //

  const handleReset = () => {
    formikvehicule.resetForm();
  };

  const marqueOptions = Listemarque.map((marque) => ({
    value: marque.name,
    label: marque.name,
  }));

  const modeleFiltered = Listemodele.filter(
    (item) => item.marque === formikvehicule.values.marque
  );
  const modeleOptions = modeleFiltered.map((modele) => ({
    value: modele.name,
    label: modele.name,
  }));

  const typeOptions = [
    { value: "Cargaison", label: "Cargaison" },
    { value: "Transport", label: "Transport" },
  ];

  const carburantOptions = ListeTypeCarburant.map((Carburant) => ({
    value: Carburant.name,
    label: Carburant.name,
  }));

  const categorieOptions = Listecategorie.map((categorie) => ({
    value: categorie.name,
    label: categorie.name,
  }));

  const optionsetat = ListeEtatVehicule.map((e) => ({
    value: e.name,
    label: e.name,
  }));

  //

  //

  //
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur aucun vehicule trouver</div>;
  }
  //

  //

  return (
    <form method="POST" onSubmit={formikvehicule.handleSubmit}>
      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="">Matricule</label>
          <input
            type="text"
            className="form-control"
            value={formikvehicule.values.matricule}
            id=""
            name="matricule"
            onChange={formikvehicule.handleChange}
          />
        </div>
        <div className="form-group w-50">
          <label for="">Marque</label>

          <Select
            id=""
            name="marque"
            className="bg-secondary mb-3"
            options={marqueOptions}
            value={
              formikvehicule.values.marque
                ? marqueOptions.find(
                    (option) => option.value === formikvehicule.values.marque
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) => {
              formikvehicule.setFieldValue(
                "marque",
                selectedOption ? selectedOption.value : ""
              );

              // Réinitialiser la valeur du modèle lorsque la marque est modifiée
              formikvehicule.setFieldValue("modele", "");
            }}
          />
        </div>
        <div className="form-group w-50">
          <label for="">Modele</label>

          <Select
            id=""
            name="modele"
            className="bg-secondary mb-3"
            options={modeleOptions}
            value={
              formikvehicule.values.modele
                ? modeleOptions.find(
                    (option) => option.value === formikvehicule.values.modele
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "modele",
                selectedOption ? selectedOption.value : ""
              )
            }
            isDisabled={!formikvehicule.values.marque}
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="typedetransport">Type</label>
          <Select
            id="typedetransport"
            name="typedetransport"
            className=" mb-3"
            options={typeOptions}
            value={
              formikvehicule.values.typedetransport
                ? typeOptions.find(
                    (option) =>
                      option.value === formikvehicule.values.typedetransport
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "typedetransport",
                selectedOption ? selectedOption.value : ""
              )
            }
            isClearable
          />
        </div>

        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Nombre de place Max</label>
          <input
            type="number"
            min="1"
            max="50"
            className="form-control"
            value={formikvehicule.values.nombreplacemax}
            id="nombreplacemax"
            name="nombreplacemax"
            onChange={formikvehicule.handleChange}
          />
        </div>
      </div>

      <fieldset className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0 w-25">
          Capacite bagages
        </legend>
        <div className="col-sm-10 w-75 d-flex justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="capacitebagages"
              id="petite"
              value="petite"
              checked={formikvehicule.values.capacitebagages === "petite"}
              onChange={formikvehicule.handleChange}
            />
            <label className="form-check-label" htmlFor="petite">
              Petite
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="capacitebagages"
              id="moyenne"
              value="moyenne"
              checked={formikvehicule.values.capacitebagages === "moyenne"}
              onChange={formikvehicule.handleChange}
            />
            <label className="form-check-label" htmlFor="moyenne">
              Moyenne
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="capacitebagages"
              id="grande"
              value="grande"
              checked={formikvehicule.values.capacitebagages === "grande"}
              onChange={formikvehicule.handleChange}
            />
            <label className="form-check-label" htmlFor="grande">
              Grande
            </label>
          </div>
        </div>
      </fieldset>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group w-50">
          <label for="typecarburant">Type Carburant</label>

          <Select
            id="typecarburant"
            name="typecarburant"
            className=" mb-3"
            options={carburantOptions}
            value={
              formikvehicule.values.typecarburant
                ? carburantOptions.find(
                    (option) =>
                      option.value === formikvehicule.values.typecarburant
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "typecarburant",
                selectedOption ? selectedOption.value : ""
              )
            }
            isClearable
          />
        </div>

        <div className="form-group w-50">
          <label for="categories">Categorie</label>
          <Select
            id="categories"
            name="categories"
            className=" mb-3"
            options={categorieOptions}
            value={
              formikvehicule.values.categories
                ? categorieOptions.find(
                    (option) =>
                      option.value === formikvehicule.values.categories
                  )
                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
            }
            onChange={(selectedOption) =>
              formikvehicule.setFieldValue(
                "categories",
                selectedOption ? selectedOption.value : ""
              )
            }
            isClearable
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Assurance</label>
          <input
            type="date"
            className="form-control"
            id="dateassurance"
            name="dateassurance"
            value={formikvehicule.values.dateassurance}
            onChange={formikvehicule.handleChange}
          />
        </div>
        <div className="form-group mb-3 w-50">
          <label for="exampleInputEmail1">Controle Technique</label>
          <input
            type="date"
            className="form-control"
            id="datectrltechnique"
            name="datectrltechnique"
            value={formikvehicule.values.datectrltechnique}
            onChange={formikvehicule.handleChange}
          />
        </div>
      </div>

      <hr />

      <div className="form-group">
        <label for="etatvehicule">Etat</label>

        <Select
          id="etatvehicule"
          name="etatvehicule"
          className=" mb-3"
          options={optionsetat}
          value={
            formikvehicule.values.etatvehicule
              ? optionsetat.find(
                  (option) =>
                    option.value === formikvehicule.values.etatvehicule
                )
              : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
          }
          onChange={(selectedOption) =>
            formikvehicule.setFieldValue(
              "etatvehicule",
              selectedOption ? selectedOption.value : ""
            )
          }
          isClearable
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" name="submitvehicule" class="btn btn-success">
          Confirmer
        </button>
        <button
          type="reset"
          onClick={handleReset}
          name="resetvehicule"
          class="btn btn-warning"
        >
          Reinitialiser
        </button>
      </div>
    </form>
  );
}

//

//

export function TableauVoirVehicule() {
  //recuperer les donnees du backend
//  const { data: vehicles, isLoading, isError } = useFetchVehicles(); // changer le nom de la variable
//   const { vehicules, isLoading, isError, error } = useFetchVehicles();
  const [vehicules, setVehicules] = useState([]);

  const getall= () => {
    axios.get("http://localhost:5000/api/v1/vehicule", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      console.log(res.data.vehicules);
      setVehicules(res.data);
    }).catch(err => {
      console.log(err, "erreur")
    });
  }
  //

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  // if (isError) {
  //   return <div>Erreur aucun vehicule trouver</div>;
  // }

  //

  return (
    <div className="card-body">
      <div> <button onClick={getall}> get all</button></div>
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped table-hover"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr className="text-white">
              <th>#</th>
              <th>Matricules</th>
              <th>Marques</th>
              <th>Modeles</th>
              <th>Types Carburant</th>
              <th>Categories</th>
              <th>Nbr Passagers Max</th>
              <th>Controle Technique</th>
              <th>Etats</th>
              <th>Consulter</th>
            </tr>
          </thead>

          <tbody>
            {ListeVehicule.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.matricule}</td>
                <td>{v.marque}</td>
                <td>{v.modele}</td>
                <td>{v.typecarburant}</td>
                <td>{v.categories}</td>
                <td>{v.nombreplacemax}</td>
                <td>{v.datecontroleTechnique}</td>

                <td>
                  <span
                    className={`badge ${
                      v.etat === "Pret" ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {v.etat}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/vehicule/${v.id}/Graphs`}
                    class="badge bg-info text-decoration-none text-white"
                  >
                    <i class="fa fa-check"></i>Consulter
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

//

export function TableauVoirVehiculeRecherche({ vehiculesFiltresfinal }) {
  const [tab, settab] = useState([]);
  useEffect(() => {
    if (vehiculesFiltresfinal) {
      settab(vehiculesFiltresfinal);
    } else {
      return <p>aucun vehicule trouver</p>;
    }
  }, [vehiculesFiltresfinal]);

  return (
    <div className="card-body">
      {" "}
      {/* <button onClick={() => handleSubmit()}>cecec</button> */}
      <div className="table-responsive">
        <table
          className="table table-bordered table-striped table-hover"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr className="text-white">
              <th>#</th>
              <th>Matricules</th>
              <th>Marques</th>
              <th>Modeles</th>
              <th>Types Carburant</th>
              <th>Categories</th>
              <th>Nbr Passagers Max</th>
              <th>Controle Technique</th>
              <th>Etats</th>
              <th>Consulter</th>
            </tr>
          </thead>

          <tbody>
            {tab.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.matricule}</td>
                <td>{v.marque}</td>
                <td>{v.modele}</td>
                <td>{v.typecarburant}</td>
                <td>{v.categories}</td>
                <td>{v.nombreplacemax}</td>
                <td>{v.datecontroleTechnique}</td>

                <td>
                  <span
                    className={`badge ${
                      v.etat === "Pret" ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {v.etat}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/vehicule/${v.id}/Graphs`}
                    class="badge bg-info text-decoration-none text-white"
                  >
                    <i class="fa fa-check"></i>Consulter
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

//

//

//

export function VehiculeRechercheAvance({ setVehiculesFiltres2, barre }) {
  //

  const { data, isLoading, isError } = useSearchVehicles("");

  const formikrecherche = useFormik({
    initialValues: {
      marque: "",
      modele: "",
      typecarburant: "",
      categories: "",
      nombreplacemax: "",
      etat: "",
    },
    onSubmit: (values) => {
      const searchParams = { ...values }; // Copiez les valeurs du formulaire dans un nouvel objet
      //useAdvancedSearchVehicles();
      //const { data: vehicles } = UseAdvancedSearchVehicles(searchParams);
      const ListeVehiculefiltre = ListeVehicule.filter((v) => {
        return (
          v.marque.toLowerCase() === values.marque.toLowerCase() ||
          v.modele.toLowerCase() === values.modele.toLowerCase() ||
          v.typecarburant.toLowerCase() ===
            values.typecarburant.toLowerCase() ||
          v.categories.toLowerCase() === values.categories.toLowerCase() ||
          v.nombreplacemax.toLowerCase() ===
            values.nombreplacemax.toLowerCase() ||
          v.etat.toLowerCase() === values.etat.toLowerCase()
        );
      });
      setVehiculesFiltres2(ListeVehiculefiltre);
      console.log(ListeVehiculefiltre);

      // handleReset();
    },
  });

  const handleReset = () => {
    formikrecherche.resetForm();
  };

  useEffect(() => {
    if (barre === true) {
      formikrecherche.resetForm();
    }
  }, [barre]);
  //
  // const { data: searchResults } = useAdvancedSearchVehicles(
  //   ...formikrecherche.values
  // );
  // setvehiculesearch(searchResults);
  //

  //

  //options select

  const marqueOptions = Listemarque.map((marque) => ({
    value: marque.name,
    label: marque.name,
  }));

  const modeleFiltered = Listemodele.filter(
    (item) => item.marque === formikrecherche.values.marque
  );
  const modeleOptions = modeleFiltered.map((modele) => ({
    value: modele.name,
    label: modele.name,
  }));

  const typeOptions = [
    { value: "cargaison", label: "Cargaison" },
    { value: "transport", label: "Transport" },
  ];

  const carburantOptions = ListeTypeCarburant.map((Carburant) => ({
    value: Carburant.name,
    label: Carburant.name,
  }));

  const categorieOptions = Listecategorie.map((categorie) => ({
    value: categorie.name,
    label: categorie.name,
  }));

  const optionsetat = ListeEtatVehicule.map((e) => ({
    value: e.name,
    label: e.name,
  }));

  //

  return (
    <div className="card bg-secondary text-white">
      <div className="card-header">
        <FaSearch />
        Recherche Avancée
      </div>
      <div className="card-body">
        <form onSubmit={formikrecherche.handleSubmit}>
          <div className="d-flex align-items-center gap-3 justify-content-between">
            <div className="form-group ">
              <label for="">Marque</label>

              <Select
                id=""
                name="marque"
                className="bg-secondary mb-3"
                options={marqueOptions}
                value={
                  formikrecherche.values.marque
                    ? marqueOptions.find(
                        (option) =>
                          option.value === formikrecherche.values.marque
                      )
                    : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                }
                onChange={(selectedOption) => {
                  formikrecherche.setFieldValue(
                    "marque",
                    selectedOption ? selectedOption.value : ""
                  );

                  // Réinitialiser la valeur du modèle lorsque la marque est modifiée
                  formikrecherche.setFieldValue("modele", "");
                }}
              />
            </div>
            <div className="form-group">
              <label for="">Modele</label>

              <Select
                id=""
                name="modele"
                className="bg-secondary mb-3"
                options={modeleOptions}
                value={
                  formikrecherche.values.modele
                    ? modeleOptions.find(
                        (option) =>
                          option.value === formikrecherche.values.modele
                      )
                    : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                }
                onChange={(selectedOption) =>
                  formikrecherche.setFieldValue(
                    "modele",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                isDisabled={!formikrecherche.values.marque}
              />
            </div>
            <div className="form-group mb-3 ">
              <label for="nombreplacemax">Nombre de place Max</label>
              <input
                type="number"
                min="1"
                max="50"
                className="form-control"
                value={formikrecherche.values.nombreplacemax}
                id="nombreplacemax"
                name="nombreplacemax"
                onChange={formikrecherche.handleChange}
              />
            </div>
            <div className="form-group ">
              <label for="typecarburant">Type Carburant</label>

              <Select
                id="typecarburant"
                name="typecarburant"
                className=" mb-3"
                options={carburantOptions}
                value={
                  formikrecherche.values.typecarburant
                    ? carburantOptions.find(
                        (option) =>
                          option.value === formikrecherche.values.typecarburant
                      )
                    : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                }
                onChange={(selectedOption) =>
                  formikrecherche.setFieldValue(
                    "typecarburant",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                isClearable
              />
            </div>
            <div className="form-group">
              <label for="categories">Categorie</label>
              <Select
                id="categories"
                name="categories"
                className=" mb-3"
                options={categorieOptions}
                value={
                  formikrecherche.values.categories
                    ? categorieOptions.find(
                        (option) =>
                          option.value === formikrecherche.values.categories
                      )
                    : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                }
                onChange={(selectedOption) =>
                  formikrecherche.setFieldValue(
                    "categories",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                isClearable
              />
            </div>
            <div className="form-group">
              <label for="etatvehicule">Etat</label>

              <Select
                id="etatvehicule"
                name="etatvehicule"
                className=" mb-3"
                options={optionsetat}
                value={
                  formikrecherche.values.etatvehicule
                    ? optionsetat.find(
                        (option) =>
                          option.value === formikrecherche.values.etatvehicule
                      )
                    : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                }
                onChange={(selectedOption) =>
                  formikrecherche.setFieldValue(
                    "etatvehicule",
                    selectedOption ? selectedOption.value : ""
                  )
                }
                isClearable
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" name="submitvehicule" class="btn btn-success">
              Confirmer
            </button>
            <button
              type="reset"
              onClick={handleReset}
              name="resetvehicule"
              class="btn btn-warning"
            >
              Reinitialiser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function BarreNavigation({ setVehiculesFiltres, barre }) {
  //

  //

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);

    const regex = new RegExp(searchValue.split("").join(".*"), "i");
    const ListeVehiculeRechercher = ListeVehicule.filter(
      (v) =>
        regex.test(v.marque) ||
        regex.test(v.modele) ||
        regex.test(v.matricule) ||
        regex.test(v.typecarburant)
    );
    if (!ListeVehiculeRechercher) {
      return <p>aucun vehicule trouver</p>;
    } else {
      setVehiculesFiltres(ListeVehiculeRechercher);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //

  //recuperer les donnees du backend
  // const { data: vehicles, isLoading, isError } = useSearchVehicles(searchTerm);

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  // if (isError) {
  //   return <div>Erreur aucun vehicule trouver</div>;
  // }

  //

  // if (ListeVehiculeRechercher.length === 0) {
  //   return <div>Aucun vehicule trouver</div>;
  // }

  //

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        className="form-control bg-dark border-0"
        value={barre ? searchTerm : ""}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ boxShadow: "0 0 0 0.15rem var(--primary2) !important" }}
        placeholder="Rechercher..."
        disabled={!barre}
      ></input>
      {/* <button type="submit"> Rechercher</button> */}
      {/* <button
        onClick={() => {
          setbarre((barre) => !barre);
          setSearchTerm("");
        }}
      >
        Recherche Avancée
      </button> */}
    </form>
  );
}
