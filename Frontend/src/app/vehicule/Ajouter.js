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
import { useCreateVehicle } from "../actions/actionvehicule";

export default function AjouterV() {
  return (
    <>
      <ToastContainer />
      <div className="container-fluid pt-4 px-4">
        <ol className="breadcrumb bg-secondary p-2 rounded">
          <li className="breadcrumb-item">
            <Link className="textprimary">Vehicules</Link>
          </li>
          <li className="breadcrumb-item active">Ajouter</li>
        </ol>
        <hr />
        <div className="card bg-secondary">
          <div className="card-header text-white">Ajouter Vehicules</div>

          <div className="card-body p-4">
            {/* form */}
            <AjouterForm />
          </div>
        </div>

        <hr />

        <div className="d-flex align-items-center gap-3">
          <div className="w-50">
            <div className="card bg-secondary">
              <div className="card-header text-white">Ajouter Marque</div>
              <div className="card-body p-4">
                {/* marque */}
                <AjouterMarque />
              </div>
            </div>
          </div>

          <div className="w-50">
            <div className="card bg-secondary">
              <div className="card-header text-white">Ajouter Modele</div>
              <div className="card-body p-4">
                {/* modele */}
                <AjouterModele />
              </div>
            </div>
          </div>

          {/*      <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="card bg-secondary">
            <div className="card-header text-white">Ajouter Type</div>
            <div className="card-body p-4">
              type <AjouterType /> 
             
            </div>
          </div>
        </div>*/}
        </div>
      </div>
    </>
  );
}

//ajouter vehicule
//data
const ListeVehicule = Data.Vehicules;
const Listemarque = Data.marque;
const Listemodele = Data.modele;
const ListeTypeCarburant = Data.Type_Carburant;
const Listecategorie = Data.Categories_permis;
const ListeEtatVehicule = Data.etatV;

export function AjouterForm() {
  // {/*

  const createVehicleMutation = useCreateVehicle();
  //*/}

  // const createFormData = async (data) => {
  //   try {
  //     const response = await axios.post("/api/form", data);
  //     return response.data;
  //   } catch (error) {
  //     toast.error("Failed to create form data");
  //     throw error;
  //   }
  // };

  // const mutation = useMutation(createFormData);

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
        createVehicleMutation.mutate(values);
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

//ajouter marque

export function AjouterMarque() {
  //data
  const marqueOptions = [
    { value: "Nouvelle marque", label: "Nouvelle marque" },
    ...Data.marque.map((marque) => ({
      value: marque.name,
      label: marque.name,
    })),
  ];

  // const Listemarque = Data.marque;
  const validationSchema = Yup.object().shape({
    marque: Yup.string().required("Le champ Marque est requis"),
    MAJ: Yup.string().required("Le champ MAJ est requis"),
    // Autres règles de validation pour les autres champs
  });

  const handleDeleteMarque = async () => {
    try {
      //const response = await axios.delete(`/marques/${id}`);
      toast.success("La marque a été supprimée avec succès !");
      // TODO: Effectuez toute autre opération nécessaire, comme mettre à jour l'état local des marques
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur s'est produite lors de la suppression de la marque."
      );
    }
  };

  const formikmarque = useFormik({
    initialValues: {
      marque: "",
      MAJ: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!values.MAJ) {
        toast.error("Veuillez entrer une marque.");
      } else if (
        Listemarque.some(
          (item) => item.name.toLowerCase() === values.MAJ.toLowerCase()
        )
      ) {
        toast.error("Cette marque existe déjà.");
        setSubmitting(false); // Pour définir le formulaire en état non soumis
      } else {
        alert(JSON.stringify(values, null, 2));
        toast.success(
          "La marque " + values.MAJ + " à était ajoutée avec succès !"
        );
        handleReset();
      }
    },
  });

  const handleReset = () => {
    formikmarque.resetForm();
  };

  return (
    <form action="" onSubmit={formikmarque.handleSubmit}>
      <div className="d-flex flex-md-column">
        <div className="form-group mb-3 d-flex justify-content-between gap-2">
          <div className="form-group w-50">
            <label for="marque">Marque</label>
            <Select
              id="marque"
              name="marque"
              className="bg-secondary mb-3"
              options={marqueOptions}
              value={
                formikmarque.values.marque
                  ? marqueOptions.find(
                      (option) => option.value === formikmarque.values.marque
                    )
                  : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
              }
              onChange={(selectedOption) => {
                formikmarque.setFieldValue(
                  "marque",
                  selectedOption ? selectedOption.value : ""
                );

                // Réinitialiser la valeur du modèle lorsque la marque est modifiée
                // formikmarque.setFieldValue("modele", "");
              }}
            />
          </div>

          <div className="form-group mb-3 w-50">
            <label for="">MAJ</label>
            <input
              type="text"
              className="form-control"
              value={formikmarque.values.MAJ}
              onChange={formikmarque.handleChange}
              id=""
              name="MAJ"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" name="submitmarqueform" class="btn btn-success">
            Confirmer
          </button>
          <button
            type="button"
            name="deletmarqueform"
            className="btn btn-danger"
            onClick={() => {
              if (
                formikmarque.values.marque &&
                formikmarque.values.marque !== "Nouvelle categorie" &&
                window.confirm(
                  "Êtes-vous sûr de vouloir supprimer cette categorie ?"
                )
              ) {
                handleDeleteMarque();
                handleReset();
              }
            }}
            isClearable
            disabled={
              !formikmarque.values.marque ||
              formikmarque.values.marque === "Nouvelle marque"
            }
          >
            Supprimer
          </button>
        </div>
      </div>
    </form>
  );
}

//ajouter modele

export function AjouterModele() {
  //data
  const validationSchema = Yup.object().shape({
    modele: Yup.string().required("Le champ Modèle est requis"),
    marque: Yup.string().required("Le champ Marque est requis"),
    MAJ: Yup.string().required("Le champ MAJ est requis"),
    // Autres règles de validation pour les autres champs
  });
  const formikmodele = useFormik({
    initialValues: {
      marque: "",
      modele: "",
      MAJ: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (!values.MAJ && !values.modele) {
        toast.error("Veuillez entrer un modele.");
      } else if (
        Listemodele.some(
          (item) => item.name.toLowerCase() === values.MAJ.toLowerCase()
        )
      ) {
        toast.error("Ce modele existe déjà.");
        setSubmitting(false); // Pour définir le formulaire en état non soumis
      } else {
        alert(JSON.stringify(values, null, 2));
        toast.success(
          "Le modele " + values.MAJ + " à était ajoutée avec succès !"
        );
      }
    },
  });
  const Listemarque = Data.marque;
  const Listemodele = Data.modele;

  const marqueOptions = Listemarque.map((marque) => ({
    value: marque.name,
    label: marque.name,
  }));

  // const marqueOptions = [
  //   { value: "Nouvelle marque", label: "Nouvelle marque" },
  //   ...Data.marque.map((marque) => ({
  //     value: marque.name,
  //     label: marque.name,
  //   })),
  // ];

  const modeleFiltered = Listemodele.filter(
    (item) => item.marque === formikmodele.values.marque
  );
  const modeleOptions = [
    { value: "Nouveau modele", label: "Nouveau modele" },
    ...modeleFiltered.map((modele) => ({
      value: modele.name,
      label: modele.name,
    })),
  ];

  const handleDeleteModele = async () => {
    try {
      //const response = await axios.delete(`/marques/${id}`);
      toast.success("La marque a été supprimée avec succès !");
      // TODO: Effectuez toute autre opération nécessaire, comme mettre à jour l'état local des marques
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur s'est produite lors de la suppression de la marque."
      );
    }
  };

  const handleReset = () => {
    formikmodele.resetForm();
  };
  // const modeleFiltered = Listemodele.filter(
  //   (item) => item.marque === formikmodele.values.marque
  // );

  // useEffect(() => {
  //   setModeleFiltered(
  //     Listemodele.filter((item) => item.marque === formikmodele.values.marque)
  //   );
  // }, [formikmodele.values.marque]);

  const handleMarqueChange = (event) => {
    formikmodele.setFieldValue("modele", ""); // réinitialise le champ "modele"
    formikmodele.handleChange(event); // met à jour la valeur de la marque sélectionnée
  };

  return (
    <form action="" onSubmit={formikmodele.handleSubmit}>
      <div className="d-flex flex-md-column">
        <div className="form-group mb-3 d-flex gap-3">
          <div className="form-group w-50">
            <label for="marque">Marque</label>
            <Select
              id="marque"
              name="marque"
              className="bg-secondary mb-3"
              options={marqueOptions}
              value={
                formikmodele.values.marque
                  ? marqueOptions.find(
                      (option) => option.value === formikmodele.values.marque
                    )
                  : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
              }
              onChange={(selectedOption) => {
                formikmodele.setFieldValue(
                  "marque",
                  selectedOption ? selectedOption.value : ""
                );

                // Réinitialiser la valeur du modèle lorsque la marque est modifiée
                formikmodele.setFieldValue("modele", "");
              }}
            />
          </div>
          <div className="form-group w-50">
            <label for="modele">Modele</label>{" "}
            <Select
              id="modele"
              name="modele"
              className="bg-secondary mb-3"
              options={modeleOptions}
              value={
                formikmodele.values.modele
                  ? modeleOptions.find(
                      (option) => option.value === formikmodele.values.modele
                    )
                  : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
              }
              onChange={(selectedOption) =>
                formikmodele.setFieldValue(
                  "modele",
                  selectedOption ? selectedOption.value : ""
                )
              }
              isDisabled={!formikmodele.values.marque}
            />
          </div>

          <div className="form-group mb-3 w-50">
            <label for="">MAJ</label>
            <input
              type="text"
              className="form-control"
              value={formikmodele.values.MAJ}
              onChange={formikmodele.handleChange}
              id=""
              name="MAJ"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" name="submitmarqueform" class="btn btn-success">
            Confirmer
          </button>
          <button
            type="button"
            name="deletmodeleform"
            className="btn btn-danger"
            onClick={() => {
              if (
                formikmodele.values.marque &&
                formikmodele.values.modele !== "Nouveau modele" &&
                formikmodele.values.modele &&
                window.confirm("Êtes-vous sûr de vouloir supprimer ce modele ?")
              ) {
                handleDeleteModele();
                handleReset();
              }
            }}
            isClearable
            disabled={
              !formikmodele.values.marque ||
              formikmodele.values.modele === "Nouveau modele" ||
              !formikmodele.values.modele
            }
          >
            Supprimer
          </button>
        </div>
      </div>
    </form>
  );
}
