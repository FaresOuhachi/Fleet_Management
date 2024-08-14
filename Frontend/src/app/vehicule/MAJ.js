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
import Select from "react-select";
import { isDisabled } from "@testing-library/user-event/dist/utils";

import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";

// const Vlist = [
//   {
//     id: 1,
//     matricule: "9876542234",
//     marque: "Fiat",
//     modele: "Panda",
//     typeCarburant: "Escence",
//     categorie: "B",
//     nbrPassagersMax: 3,
//     controleTechnique: "12-12-2023",
//     etat: "pret",
//     type: "transport",
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
//     type: "cargaison",
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
//     type: "transport",
//   },
// ];

// const categorie = [
//   { id: 1, name: "A" },
//   { id: 2, name: "B" },
//   { id: 3, name: "C" },
// ];

// const modele = [
//   {
//     id: 1,
//     marque: "Fiat",
//     name: "Panda",
//   },
//   {
//     id: 2,
//     marque: "Volswagen",
//     name: "Golf",
//   },
//   {
//     id: 3,
//     marque: "Volswagen",
//     name: "Polo",
//   },
//   {
//     id: 4,
//     marque: "Renault",
//     name: "Clio",
//   },
// ];

// const typeCarburant = [
//   {
//     id: 1,
//     name: "Electrique",
//   },
//   {
//     id: 2,
//     name: "Gazoil",
//   },
//   {
//     id: 3,
//     name: "Escence",
//   },
// ];

// const type = [
//   {
//     id: 1,
//     name: "cargaison",
//   },
//   {
//     id: 2,
//     name: "transport",
//   },
// ];

// const etat = [
//   {
//     id: 1,
//     name: "pret",
//   },
//   {
//     id: 2,
//     name: "nonpret",
//   },
// ];

//data
const ListeVehicule = Data.Vehicules;
const Listemarque = Data.marque;
const Listemodele = Data.modele;
const ListeTypeCarburant = Data.Type_Carburant;
const Listecategorie = Data.Categories_permis;
const ListeEtatVehicule = Data.etatV;

export default function MAJ() {
  // const [formData, setFormData] = useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(formData);
  // };
  // const { id } = useParams();
  // const vehicule = ListeVehicule.find((v) => v.id === parseInt(id));

  // //
  // // const dateObj = new Date(vehicule.controleTechnique);

  // // // Formater la date en une chaîne ISO 8601
  // // const dateControleTechnique = dateObj.toISOString().split("T")[0];

  // //
  // const initialValues = {
  //   matricule: vehicule.matricule,
  //   marque: vehicule.marque,
  //   modele: vehicule.modele,
  //   typedetransport: vehicule.typedetransport,
  //   nombreplacemax: vehicule.nombreplacemax,
  //   capacitebagages: vehicule.capacitebagages,
  //   typecarburant: vehicule.typecarburant,
  //   categories: vehicule.categories,
  //   dateassurance: vehicule.dateassurance,
  //   datectrltechnique: vehicule.datecontroleTechnique,
  //   etatvehicule: vehicule.etat,
  // };
  // //

  // const validationSchema = Yup.object().shape({
  //   // matricule: Yup.string().required("Le champ Matricule est requis"),
  //   // modele: Yup.string().required("Le champ Modèle est requis"),
  //   // marque: Yup.string().required("Le champ Marque est requis"),
  //   // etatvehicule: Yup.string().required("Le champ Etat est requis"),
  //   // Autres règles de validation pour les autres champs
  // });
  // const formikvehicule = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: validationSchema,
  //   onSubmit: (values, { setSubmitting }) => {
  //     if (!values.matricule) {
  //       toast.error("Veuillez entrer un matricule.");
  //       setSubmitting(false);
  //     } else if (!values.marque && !values.modele && !values.etatvehicule) {
  //       toast.error(
  //         "Veuillez entrer les informations suivantes : Marque, Modele, Etat"
  //       );
  //       setSubmitting(false); // Pour définir le formulaire en état non soumis
  //     } else {
  //       alert(JSON.stringify(values, null, 2));
  //       toast.success(
  //         "Le vehicule" +
  //           values.marque +
  //           " " +
  //           values.modele +
  //           " avec le maticule " +
  //           values.matricule +
  //           " à était ajoutée avec succès !"
  //       );
  //     }
  //   },
  // });

  // const modeleFiltered = Listemodele.filter(
  //   (item) => item.marque === formikvehicule.values.marque
  // );

  // //

  return (
    <>
      <ToastContainer />
      <div className="container-fluid pt-4 px-4">
        <ol className="breadcrumb bg-secondary p-2 rounded">
          <li className="breadcrumb-item">
            <span className="textprimary">Vehicules</span>
          </li>
          <li className="breadcrumb-item active">Ajouter</li>
        </ol>
        <hr />
        <div className="card bg-secondary">
          <div className="card-header text-white">Ajouter Vehicules</div>

          <div className="card-body p-4">
            {/* <form method="POST" onSubmit={formikvehicule.handleSubmit}>
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
                  <select
                    className="form-select mb-3"
                    name="marque"
                    id=""
                    value={formikvehicule.values.marque}
                    onChange={formikvehicule.handleChange}
                  >
                    <option value="">Selectionner Marque</option>
                    {Listemarque.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group w-50">
                  <label for="">Modele</label>
                  <select
                    className="form-select mb-3"
                    name="modele"
                    id=""
                    value={formikvehicule.values.modele}
                    onChange={formikvehicule.handleChange}
                  >
                    <option value="">Selectionner Modele</option>
                    {modeleFiltered.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="form-group w-50">
                  <label for="">Type</label>
                  <select
                    className="form-select mb-3"
                    name="typedetransport"
                    id="typedetransport"
                    value={formikvehicule.values.typedetransport}
                    onChange={formikvehicule.handleChange}
                  >
                    <option value="">Selectionner Type</option>
                    <option value="Transport">Transport</option>
                    <option value="Cargaison">Cargaison</option>
                  </select>
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
                      checked={
                        formikvehicule.values.capacitebagages === "petite"
                      }
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
                      checked={
                        formikvehicule.values.capacitebagages === "moyenne"
                      }
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
                      checked={
                        formikvehicule.values.capacitebagages === "grande"
                      }
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
                  <label for="">Type Carburant</label>
                  <select
                    className="form-select mb-3"
                    name="typecarburant"
                    id=""
                    value={formikvehicule.values.typecarburant}
                    onChange={formikvehicule.handleChange}
                  >
                    <option value="">Selectionner Type Carburant</option>
                    {ListeTypeCarburant.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group w-50">
                  <label for="">Categorie</label>
                  <select
                    className="form-select mb-3"
                    name="categories"
                    id=""
                    value={formikvehicule.values.categories}
                    onChange={formikvehicule.handleChange}
                  >
                    <option value="">Selectionner Categorie</option>
                    {Listecategorie.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
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
                <label for="exampleFormControlSelect1">Etat</label>
                <select
                  className="form-select mb-3"
                  name="etatvehicule"
                  id="etatvehicule"
                  value={formikvehicule.values.etatvehicule}
                  onChange={formikvehicule.handleChange}
                >
                  <option value="">Selectionner Etat</option>
                  {ListeEtatVehicule.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  name="submitajoutervehicule"
                  className="btn btn-success"
                >
                  Confirmer
                </button>
                <button
                  type="reset"
                  name="resetajoutervehicule"
                  className="btn btn-warning"
                >
                  Reinitialiser
                </button>
              </div>
            </form> */}
            <MAJForm />
          </div>
        </div>
      </div>
    </>
  );
}

//MAJ vehicule

const fetchVehicles = async () => {
  const response = await axios.get("/api/vehicules"); // Remplacez l'URL par l'endpoint approprié pour récupérer les véhicules depuis votre backend
  return response.data;
};

const updateVehicle = async (updatedValues) => {
  try {
    const response = await axios.put(
      `/api/vehicules/${updatedValues.id}`,
      updatedValues
    );
    return response.data;
  } catch (error) {
    throw new Error("Échec de la mise à jour du véhicule");
  }
};

export function MAJForm() {
  //recuperer les donnees depuis le backend

  const {
    data: vehicules,
    isLoading,
    isError,
    error,
  } = useQuery("vehicules", fetchVehicles);

  // if (isLoading) {
  //   return <div>Chargement...</div>;
  // }

  // if (isError) {
  //   return <div>Erreur: {error.message}</div>;
  // }

  //

  //
  const queryClient = useQueryClient();
  //

  //recuperer l'id de l'url

  const { id } = useParams();
  const vehicule = ListeVehicule.find((v) => v.id === parseInt(id));

  //
  const mutation = useMutation(updateVehicle, {
    onSuccess: () => {
      // Invalider la requête précédente pour rafraîchir les données du véhicule
      queryClient.invalidateQueries("vehicules");
      // Afficher une notification ou effectuer une autre action en cas de réussite
      toast.success("Mise à jour du véhicule réussie");
    },
  });

  const handleSubmit = async (values) => {
    try {
      // Appeler la mutation pour mettre à jour le véhicule
      await mutation.mutateAsync(values);
      console.log(values);
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
