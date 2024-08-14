import React from "react";
import {Link} from "react-router-dom";
import Data from "../Data.json";
import {type} from "@testing-library/user-event/dist/type";
import {useFormik} from "formik";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Toastify} from "toastify";
import {useState} from "react";
import {useEffect} from "react";
import * as Yup from "yup";
import Select from "react-select";
import {isDisabled} from "@testing-library/user-event/dist/utils";
import {useMutation} from "react-query";
import axios from "axios";

export default function Ajouter() {
    return (
        <>
            <ToastContainer/>
            <div className="container-fluid pt-4 px-4">
                <ol className="breadcrumb bg-secondary p-2 rounded">
                    <li className="breadcrumb-item">
                        <span className="textprimary">Missions</span>
                    </li>
                    <li className="breadcrumb-item active">Ajouter</li>
                </ol>
                <hr/>
                <div className="card bg-secondary">
                    <div className="card-header text-white">Ajouter Missions</div>

                    <div className="card-body p-4">
                        {" "}
                        <FormAjouterMission/>
                    </div>
                </div>
            </div>
        </>
    );
}

export function FormAjouterMission() {
    const ListeChauffeur = Data.Chauffeurs;
    const ListeVehicule = Data.Vehicules;
    const Listemarque = Data.marque;
    const Listemodele = Data.modele;
    const ListeTypeCarburant = Data.Type_Carburant;
    const Listecategorie = Data.Categories_permis;
    const ListeEtatChauffeur = Data.etatC;
    const ListeEtatVehicule = Data.etatV;
    const ListeEtatMission = Data.etatM;
    const ListeCarteNaftal = Data.Carte_Naftal;
    const currentDate = new Date();
    //

    const createFormData = async (data) => {
        try {
            const response = await axios.post("/api/form", data);
            return response.data;
        } catch (error) {
            toast.error("Failed to create form data");
            throw error;
        }
    };

    const mutation = useMutation(createFormData);

    //

    const validationSchema = Yup.object().shape({
        nom: Yup.string().required("Le champ nom est requis"),
        prenom: Yup.string().required("Le champ prenom est requis"),
        destination: Yup.string().required("Le champ destination est requis"),
        date_debut_mission: Yup.date().required(
            "Veuillez entrer une date de début."
        ),
        //date_fin_mission: Yup.date().required('Veuillez entrer une date de fin.'),

        marque: Yup.string().required("Le champ marque est requis"),
        modele: Yup.string().required("Le champ modele est requis"),
        matricule: Yup.string().required("Le champ matricule est requis"),

        nomc: Yup.string().required("Le champ nomc est requis"),
        prenomc: Yup.string().required("Le champ prenomc est requis"),
        codec: Yup.string().required("Le champ codec est requis"),

        etatmission: Yup.string().required("Le champ etatmission est requis"),
    });
    const formikmission = useFormik({
        initialValues: {
            nom: "",
            prenom: "",
            tel: "",
            email: "",
            destination: "",
            wilaya: "",
            bagages: "",
            date_debut_mission: "",
            date_fin_mission: "",
            type: "",
            nombre_personne: "",
            motif: "",
            marque: "",
            modele: "",
            matricule: "",
            nomc: "",
            prenomc: "",
            codec: "",
            carte_naftal: "",
            nombre_bon_Vrac: "",
            etatmission: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            if (!values.nom && !values.prenom) {
                toast.error("Veuillez entrer nom et prenom.");
            } else if (
                new Date(values.date_debut_mission) > new Date(values.date_fin_mission)
            ) {
                toast.error("La date de début doit être antérieure à la date de fin.");
            } else if (new Date(values.date_debut_mission) < currentDate) {
                toast.error(
                    "La date de début doit être supérieure ou égale à la date actuelle."
                );
            } else {
                alert(JSON.stringify(values, null, 2));
                mutation.mutate(values);
                toast.success("La mission à était ajoutée avec succès !");
                handleReset();
            }
        },
    });

    const handleReset = () => {
        formikmission.resetForm();
    };

    //
    const typeOptions = [
        {value: "cargaison", label: "Cargaison"},
        {value: "transport", label: "Transport"},
    ];

    const marqueOptions = Listemarque.map((marque) => ({
        value: marque.name,
        label: marque.name,
    }));

    const modeleFiltered = Listemodele.filter(
        (item) => item.marque === formikmission.values.marque
    );
    const modeleOptions = modeleFiltered.map((modele) => ({
        value: modele.name,
        label: modele.name,
    }));

    const matriculeFiltered = ListeVehicule.filter(
        (item) =>
            item.marque === formikmission.values.marque &&
            item.modele === formikmission.values.modele
    );
    const matriculeOptions = matriculeFiltered.map((matricule) => ({
        value: matricule.matricule,
        label: matricule.matricule,
    }));

    //

    const nomOptions = ListeChauffeur.map((c) => ({
        value: c.nom,
        label: c.nom,
    }));

    const prenomFiltered = ListeChauffeur.filter(
        (item) => item.nom === formikmission.values.nomc
    );
    const prenomOptions = prenomFiltered.map((prenom) => ({
        value: prenom.prenom,
        label: prenom.prenom,
    }));

    const codecFiltered = ListeChauffeur.filter(
        (item) =>
            item.nom === formikmission.values.nomc &&
            item.prenom === formikmission.values.prenomc
    );
    const codecOptions = codecFiltered.map((c) => ({
        value: c.CodeC,
        label: c.CodeC,
    }));

    //

    const carteOptions = ListeCarteNaftal.map((c) => ({
        value: c.name,
        label: c.name,
    }));

    //

    const etatOptions = ListeEtatMission.map((e) => ({
        value: e.name,
        label: e.name,
    }));

    //

    return (
        <form method="POST" onSubmit={formikmission.handleSubmit}>
            <h6 className="mb-3">Demandeur</h6>
            <div className="d-flex align-items-center gap-3">
                <div class="form-group mb-3 w-50">
                    <label for="exampleInputEmail1">Nom</label>
                    <input
                        type="text"
                        class="form-control"
                        value={formikmission.values.nom}
                        onChange={formikmission.handleChange}
                        id=""
                        name="nom"
                    />
                </div>
                <div class="form-group mb-3 w-50">
                    <label for="">Prenom</label>
                    <input
                        type="text"
                        value={formikmission.values.prenom}
                        onChange={formikmission.handleChange}
                        required
                        class="form-control"
                        id=""
                        name="prenom"
                    />
                </div>
            </div>

            <div className="d-flex align-items-center gap-3">
                <div class="form-group mb-3 w-50">
                    <label htmlFor="tel">Téléphone</label>
                    <input
                        type="tel"
                        class="form-control"
                        id="tel"
                        name="tel"
                        value={formikmission.values.tel}
                        onChange={formikmission.handleChange}
                    />
                </div>

                <div class="form-group mb-3 w-50">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        value={formikmission.values.email}
                        onChange={formikmission.handleChange}
                    />
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                <div className="form-group mb-3 w-50">
                    <label htmlFor="destination">Distination</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formikmission.values.destination}
                        onChange={formikmission.handleChange}
                        id="destination"
                        name="destination"
                    />
                </div>
                <div className="form-group mb-3 w-50">
                    <label for="wilaya">Wilaya</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formikmission.values.wilaya}
                        onChange={formikmission.handleChange}
                        id="wilaya"
                        name="wilaya"
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
                            name="bagages"
                            id="petit"
                            value="petit"
                            checked={formikmission.values.bagages === "petit"}
                            onChange={formikmission.handleChange}
                        />
                        <label className="form-check-label" htmlFor="petit">
                            Petit
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="bagages"
                            id="moyen"
                            value="moyen"
                            checked={formikmission.values.bagages === "moyen"}
                            onChange={formikmission.handleChange}
                        />
                        <label className="form-check-label" htmlFor="moyen">
                            Moyen
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="bagages"
                            id="grand"
                            value="grand"
                            checked={formikmission.values.bagages === "grand"}
                            onChange={formikmission.handleChange}
                        />
                        <label className="form-check-label" htmlFor="grand">
                            Grand
                        </label>
                    </div>
                </div>
            </fieldset>

            <div className="d-flex align-items-center gap-3">
                <div className="form-group mb-3 w-50">
                    <label for="date_debut_mission">Date Debut Mission</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formikmission.values.date_debut_mission}
                        onChange={formikmission.handleChange}
                        id="date_debut_mission"
                        name="date_debut_mission"
                    />
                </div>
                <div className="form-group mb-3 w-50">
                    <label for="date_fin_mission">Date Fin Mission</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formikmission.values.date_fin_mission}
                        onChange={formikmission.handleChange}
                        id="date_fin_mission"
                        name="date_fin_mission"
                    />
                </div>
            </div>

            <div className="d-flex align-items-center gap-3">
                <div className="form-group mb-3 w-50">
                    <label for="type">Type</label>
                    <Select
                        id="type"
                        name="type"
                        className=""
                        options={typeOptions}
                        value={
                            formikmission.values.type
                                ? typeOptions.find(
                                    (option) => option.value === formikmission.values.type
                                )
                                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                        }
                        onChange={(selectedOption) =>
                            formikmission.setFieldValue(
                                "type",
                                selectedOption ? selectedOption.value : ""
                            )
                        }
                        isClearable
                    />
                </div>
                <div className="form-group mb-3 w-50">
                    <label for="nombre_personne">Nombre de Personnes</label>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        className="form-control"
                        value={formikmission.values.nombre_personne}
                        onChange={formikmission.handleChange}
                        id="nombre_personne"
                        name="nombre_personne"
                    />
                </div>
            </div>

            <div className="form-floating mb-3">
        <textarea
            className="form-control"
            placeholder="Motif"
            value={formikmission.values.motif}
            onChange={formikmission.handleChange}
            id="motif"
            style={{height: "161px"}}
        ></textarea>
                <label for="floatingTextarea4">Motif</label>
            </div>

            <hr/>

            <h6 className="mb-3">Vehicule</h6>

            <div className="d-flex align-items-center gap-3">
                <div className="form-group w-50">
                    <label for="">Marque</label>

                    <Select
                        id=""
                        name="marque"
                        className="bg-secondary mb-3"
                        options={marqueOptions}
                        value={
                            formikmission.values.marque
                                ? marqueOptions.find(
                                    (option) => option.value === formikmission.values.marque
                                )
                                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                        }
                        onChange={(selectedOption) => {
                            formikmission.setFieldValue(
                                "marque",
                                selectedOption ? selectedOption.value : ""
                            );

                            // Réinitialiser la valeur du modèle lorsque la marque est modifiée
                            formikmission.setFieldValue("modele", "");
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
                            formikmission.values.modele
                                ? modeleOptions.find(
                                    (option) => option.value === formikmission.values.modele
                                )
                                : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                        }
                        onChange={(selectedOption) => {
                            formikmission.setFieldValue(
                                "modele",
                                selectedOption ? selectedOption.value : ""
                            );
                            formikmission.setFieldValue("matricule", "");
                        }}
                        isDisabled={!formikmission.values.marque}
                    />
                </div>
            </div>

            <div className="form-group">
                <label for="matricule">Matricule</label>
                <Select
                    id="matricule"
                    name="matricule"
                    className="bg-secondary mb-3"
                    options={matriculeOptions}
                    value={
                        formikmission.values.matricule
                            ? matriculeOptions.find(
                                (option) => option.value === formikmission.values.matricule
                            )
                            : null
                    }
                    onChange={(selectedOption) =>
                        formikmission.setFieldValue(
                            "matricule",
                            selectedOption ? selectedOption.value : ""
                        )
                    }
                    isDisabled={
                        !formikmission.values.marque || !formikmission.values.modele
                    }
                    isClearable
                />
            </div>

            <hr/>

            <h6 className="mb-3">Chauffeur</h6>

            <div className="d-flex align-items-center gap-3">
                <div className="form-group w-50">
                    <label for="nomc">Nom</label>

                    <Select
                        id="nomc"
                        name="nomc"
                        className="bg-secondary mb-3"
                        options={nomOptions}
                        value={
                            formikmission.values.nomc
                                ? nomOptions.find(
                                    (option) => option.value === formikmission.values.nomc
                                )
                                : null
                        }
                        onChange={(selectedOption) => {
                            formikmission.setFieldValue(
                                "nomc",
                                selectedOption ? selectedOption.value : ""
                            );

                            formikmission.setFieldValue("prenomc", "");
                        }}
                    />
                </div>
                <div className="form-group w-50">
                    <label for="prenomc">Prenom</label>

                    <Select
                        id="prenomc"
                        name="prenomc"
                        className="bg-secondary mb-3"
                        options={prenomOptions}
                        value={
                            formikmission.values.prenomc
                                ? prenomOptions.find(
                                    (option) => option.value === formikmission.values.prenomc
                                )
                                : null
                        }
                        onChange={(selectedOption) => {
                            formikmission.setFieldValue(
                                "prenomc",
                                selectedOption ? selectedOption.value : ""
                            );
                            formikmission.setFieldValue("codec", "");
                        }}
                        isDisabled={!formikmission.values.nomc}
                    />
                </div>
            </div>

            <div className="form-group">
                <label for="codec">Code Chauffeur</label>
                <Select
                    id="codec"
                    name="codec"
                    className="bg-secondary mb-3"
                    options={codecOptions}
                    value={
                        formikmission.values.codec
                            ? codecOptions.find(
                                (option) => option.value === formikmission.values.codec
                            )
                            : null
                    }
                    onChange={(selectedOption) =>
                        formikmission.setFieldValue(
                            "codec",
                            selectedOption ? selectedOption.value : ""
                        )
                    }
                    isDisabled={
                        !formikmission.values.nomc || !formikmission.values.prenomc
                    }
                    isClearable
                />
            </div>

            <hr/>

            <h6 className="mb-3">Carte Naftal et Bon Vrac</h6>

            <div className="d-flex align-items-center gap-3">
                <div className="form-group w-50">
                    <label for="carte_naftal">Carte Naftal</label>
                    <Select
                        id="carte_naftal"
                        name="carte_naftal"
                        className="bg-secondary mb-3"
                        options={carteOptions}
                        value={
                            formikmission.values.carte_naftal
                                ? carteOptions.find(
                                    (option) =>
                                        option.value === formikmission.values.carte_naftal
                                )
                                : null
                        }
                        onChange={(selectedOption) => {
                            formikmission.setFieldValue(
                                "carte_naftal",
                                selectedOption ? selectedOption.value : ""
                            );
                        }}
                    />
                </div>
                <div className="form-group mb-3 w-50">
                    <label for="nombre_bon_Vrac">Nombre de Bon Vrac </label>
                    <input
                        type="number"
                        min="0"
                        max="99"
                        className="form-control"
                        value={formikmission.values.nombre_bon_Vrac}
                        onChange={formikmission.handleChange}
                        id="nombre_bon_Vrac"
                        name="nombre_bon_Vrac"
                    />
                </div>
            </div>

            <hr/>

            <div className="form-group">
                <label for="etatmission">Etat Mission</label>
                <Select
                    id="etatmission"
                    name="etatmission"
                    className=" mb-3"
                    options={etatOptions}
                    value={
                        formikmission.values.etatmission
                            ? etatOptions.find(
                                (option) => option.value === formikmission.values.etatmission
                            )
                            : null
                    }
                    onChange={(selectedOption) =>
                        formikmission.setFieldValue(
                            "etatmission",
                            selectedOption ? selectedOption.value : ""
                        )
                    }
                    isClearable
                />
            </div>

            <div className="d-flex justify-content-between">
                <button type="submit" name="submitmission" class="btn btn-success">
                    Confirmer
                </button>
                <button
                    type="reset"
                    onClick={handleReset}
                    name="resetmission"
                    class="btn btn-warning"
                >
                    Reinitialiser
                </button>
            </div>
        </form>
    );
}
