import React from "react";
import Data from "../Data.json";
import Select from "react-select";

import {useFormik} from "formik";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

import {useMutation} from "react-query";
import axios from "axios";

//

//

export default function Ajouter() {
    return (
        <>
            <ToastContainer/>
            <div class="container-fluid pt-4 px-4">
                <ol class="breadcrumb bg-secondary p-2 rounded">
                    <li class="breadcrumb-item">
                        <span>Chauffeurs</span>
                    </li>
                    <li class="breadcrumb-item active">Ajouter</li>
                </ol>
                <hr/>
                <div class="card bg-secondary">
                    <div class="card-header text-white">Ajouter Chauffeur</div>

                    <div class="card-body p-4">
                        {/*  */}
                        <AjouterForm/>
                        <hr/>

                        {/*  */}
                        <AjouterCategoryForm/>
                    </div>
                </div>
            </div>
        </>
    );
}

//

//

export function AjouterForm() {
    //

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

    //

    const Listecategorie = Data.Categories_permis;

    const categoryOptions = Listecategorie
        ? Listecategorie.map((category) => ({
            value: category.name,
            label: category.name,
        }))
        : [];

    //
    const ListeEtatChauffeur = Data.etatC;
    const optionsetat = ListeEtatChauffeur.map((e) => ({
        value: e.name,
        label: e.name,
    }));
    // const optionsetat = ListeEtatVehicule
    //   ? ListeEtatVehicule.map((e) => ({
    //       value: e.name,
    //       label: e.name,
    //     }))
    //   : [];

    const ListeChauffeur = Data.Chauffeurs;
    const ListeVehicule = Data.Vehicules;
    const Listemarque = Data.marque;
    const Listemodele = Data.modele;
    const ListeTypeCarburant = Data.Type_Carburant;

    const validationSchema = Yup.object().shape({
        nom: Yup.string().required("Le champ nom est requis"),
        prenom: Yup.string().required("Le champ prenom est requis"),
        etatchauffeur: Yup.string().required("Le champ etat chauffeur est requis"),
        // etatvehicule: Yup.string().required("Le champ Etat est requis"),
        // Autres règles de validation pour les autres champs
    });
    const formikchauffeur = useFormik({
        initialValues: {
            nom: "",
            prenom: "",
            tel: "",
            CodeC: "",
            adresse: "",
            date_recrutement: "",
            num_permis: "",
            validite_permis: "",
            categorie: [],
            etatchauffeur: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            if (!values.nom && !values.prenom) {
                toast.error("Veuillez entrer nom et prenom.");
            } else if (ListeChauffeur.some((item) => item.CodeC === values.CodeC)) {
                toast.error("Ce matricule existe déjà.");
                setSubmitting(false); // Pour définir le formulaire en état non soumis
            } else {
                alert(JSON.stringify(values, null, 2));
                mutation.mutate(values);
                toast.success(
                    "Le Chauffeur " +
                    values.nom +
                    " " +
                    values.prenom +
                    " avec le maticule " +
                    values.CodeC +
                    " à était ajoutée avec succès !"
                );
                handleReset();
            }
        },
    });

    const handleReset = () => {
        formikchauffeur.resetForm();
    };

    // //nom

    // const [nom, setnom] = React.useState([]);
    // const handlenomChange = (event) => {
    //   setnom(event.target.value);
    // };

    // //prenom
    // const [prenom, setprenom] = React.useState([]);
    // const handleprenomChange = (event) => {
    //   setprenom(event.target.value);
    // };

    // //tel
    // const [tel, settel] = React.useState([]);
    // const handletelChange = (event) => {
    //   settel(event.target.value);
    // };

    // //CodeC
    // const [CodeC, setCodeC] = React.useState([]);
    // const handleCodeCChange = (event) => {
    //   setCodeC(event.target.value);
    // };

    // //adresse
    // const [adresse, setadresse] = React.useState([]);
    // const handleadresseChange = (event) => {
    //   setadresse(event.target.value);
    // };

    // //date_recrutement
    // const [date_recrutement, setdate_recrutement] = React.useState([]);
    // const handledate_recrutementChange = (event) => {
    //   setdate_recrutement(event.target.value);
    // };

    // //num_permis
    // const [num_permis, setnum_permis] = React.useState([]);
    // const handlenum_permisChange = (event) => {
    //   setnum_permis(event.target.value);
    // };

    // //validite_permis
    // const [validite_permis, setvalidite_permis] = React.useState([]);
    // const handlevalidite_permisChange = (event) => {
    //   setvalidite_permis(event.target.value);
    // };

    // //categorie
    // const [categorie, setcategorie] = React.useState([]);

    // const handlecategorieChange = (selectedOptions) => {
    //   const selectedValues = selectedOptions.map((option) => option.value);
    //   setcategorie(selectedValues);
    // };

    // //etat
    // const [etat, setetat] = useState(null);

    // const handleetatChange = (selectedOption) => {
    //   setetat(selectedOption);
    // };

    //

    return (
        <form method="POST" onSubmit={formikchauffeur.handleSubmit}>
            <div class="d-flex align-items-center gap-3">
                <div class="form-group mb-3 w-50">
                    <label for="nom">Nom</label>
                    <input
                        type="text"
                        class="form-control"
                        value={formikchauffeur.values.nom}
                        onChange={formikchauffeur.handleChange}
                        id="nom"
                        name="nom"
                    />
                </div>
                <div class="form-group mb-3 w-50">
                    <label for="prenom">Prenom</label>
                    <input
                        type="text"
                        value={formikchauffeur.values.prenom}
                        onChange={formikchauffeur.handleChange}
                        required
                        class="form-control"
                        id="prenom"
                        name="prenom"
                    />
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <div class="form-group mb-3 w-50">
                    <label htmlFor="tel">Téléphone :</label>
                    <input
                        type="tel"
                        class="form-control"
                        id="tel"
                        name="tel"
                        value={formikchauffeur.values.tel}
                        onChange={formikchauffeur.handleChange}
                    />
                </div>

                <div class="form-group mb-3 w-50">
                    <label htmlFor="codeChauffeur">Code Chauffeur :</label>
                    <input
                        type="text"
                        class="form-control"
                        id="codeChauffeur"
                        name="CodeC"
                        value={formikchauffeur.values.CodeC}
                        onChange={formikchauffeur.handleChange}
                    />
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="">Adresse</label>
                <input
                    type="text"
                    class="form-control"
                    value={formikchauffeur.values.adresse}
                    onChange={formikchauffeur.handleChange}
                    id=""
                    name="adresse"
                />
            </div>
            {" "}
            <div class="d-flex align-items-center gap-3">
                <div class="form-group mb-3 w-50">
                    <label for="">Num Permis</label>
                    <input
                        type="text"
                        class="form-control"
                        value={formikchauffeur.values.num_permis}
                        onChange={formikchauffeur.handleChange}
                        id=""
                        name="num_permis"
                    />
                </div>
                <div class="form-group mb-3 w-50">
                    {" "}
                    <label htmlFor="categories">Catégories de permis :</label>
                    <Select
                        className="bg-secondary"
                        id="categories"
                        name="categories"
                        options={categoryOptions}
                        isMulti
                        value={categoryOptions.filter((option) =>
                            formikchauffeur.values.categorie.includes(option.value)
                        )}
                        onChange={(selectedOptions) =>
                            formikchauffeur.setFieldValue(
                                "categorie",
                                selectedOptions.map((option) => option.value)
                            )
                        }
                    />
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                {" "}
                <div class="form-group mb-3 w-50">
                    <label for="">Validite</label>
                    <input
                        type="date"
                        class="form-control"
                        id=""
                        name="validite_permis"
                        value={formikchauffeur.values.validite_permis}
                        onChange={formikchauffeur.handleChange}
                    />
                </div>
                <div class="form-group mb-3 w-50">
                    <label htmlFor="dateRecrutement">Date de recrutement :</label>
                    <input
                        type="date"
                        id="dateRecrutement"
                        class="form-control"
                        name="date_recrutement"
                        value={formikchauffeur.values.date_recrutement}
                        onChange={formikchauffeur.handleChange}
                    />
                </div>
            </div>
            <div class="form-group mb-3">
                <label for="">Etat</label>
                {/* <select
          class="form-select "
          name="u_car_book_status"
          id="exampleFormControlSelect1"
        >
          <option>Pret</option>
          <option>Non-Pret</option>
        </select> */}
                <Select
                    id=""
                    name="etatchauffeur"
                    className="bg-secondary"
                    options={optionsetat}
                    value={
                        formikchauffeur.values.etatchauffeur
                            ? optionsetat.find(
                                (option) =>
                                    option.value === formikchauffeur.values.etatchauffeur
                            )
                            : null // Définir la valeur par défaut sur null si la valeur est une chaîne vide
                    }
                    onChange={(selectedOption) =>
                        formikchauffeur.setFieldValue(
                            "etatchauffeur",
                            selectedOption ? selectedOption.value : ""
                        )
                    }
                />
            </div>
            <div class="d-flex justify-content-between">
                <button type="submit" name="submitchauffeur" class="btn btn-success">
                    Confirmer
                </button>
                <button
                    type="reset"
                    onClick={handleReset}
                    name="resetchauffeur"
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

export function AjouterCategoryForm() {
    const Listecategorie = [
        {value: "Nouvelle categorie", label: "Nouvelle categorie"},
        ...Data.Categories_permis.map((category) => ({
            value: category.name,
            label: category.name,
        })),
    ];

    //data
    // const Listemarque = Data.marque;
    const validationSchema = Yup.object().shape({
        categorie: Yup.string().required("Le champ Categorie est requis"),
        MAJ: Yup.string().required("Le champ MAJ est requis"),
        // Autres règles de validation pour les autres champs
    });

    const handleDeleteCategorie = async () => {
        try {
            //const response = await axios.delete(`/marques/${id}`);
            toast.success("La categorie a été supprimée avec succès !");
            // TODO: Effectuez toute autre opération nécessaire, comme mettre à jour l'état local des marques
        } catch (error) {
            console.error(error);
            toast.error(
                "Une erreur s'est produite lors de la suppression de la categorie."
            );
        }
    };

    const formikcategorie = useFormik({
        initialValues: {
            categorie: "",
            MAJ: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, {setSubmitting}) => {
            if (!values.MAJ) {
                toast.error("Veuillez entrer une marque.");
            } else if (
                Listecategorie.some(
                    (item) => item.value.toLowerCase() === values.MAJ.toLowerCase()
                )
            ) {
                toast.error("Cette categorie existe déjà.");
                setSubmitting(false); // Pour définir le formulaire en état non soumis
            } else {
                alert(JSON.stringify(values, null, 2));
                toast.success(
                    "La categorie " + values.MAJ + " à était ajoutée avec succès !"
                );
                handleReset();
            }
        },
    });

    const handleReset = () => {
        formikcategorie.resetForm();
    };

    // const [categorie, setcategorie] = useState(null);

    // const handlecategorieChange = (selectedOption) => {
    //   setcategorie(selectedOption);
    // };

    // //nouvelle categorie
    // const [nouvelle_categorie, setnouvelle_categorie] = React.useState([]);
    // const handlenouvelle_categorieChange = (event) => {
    //   setnouvelle_categorie(event.target.value);
    // };

    return (
        <form action="" onSubmit={formikcategorie.handleSubmit}>
            <h6 class="mb-4">Categories Permis</h6>

            <div class="d-flex flex-md-column">
                <div class="form-group mb-3 d-flex gap-3">
                    <div class="form-group w-50">
                        {/* <label for="exampleFormControlSelect1">Categorie</label>
            <select class="form-select mb-3" name="u_car_book_status" id="">
              <option>Nouvelle categorie</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select> */}
                        <label for="categorieselect">Categorie</label>
                        {/* <Select
              value={formikcategorie.values.categorie}
              onChange={formikcategorie.handleChange}
              options={Listecategorie}
              name="categorieselect"
              isClearable
            /> */}
                        <Select
                            id=""
                            name="categorieselect"
                            className="bg-secondary"
                            options={Listecategorie}
                            value={
                                formikcategorie.values.categorie
                                    ? Listecategorie.find(
                                        (option) =>
                                            option.value === formikcategorie.values.categorie
                                    )
                                    : null
                            }
                            onChange={(selectedOption) =>
                                formikcategorie.setFieldValue(
                                    "categorie",
                                    selectedOption ? selectedOption.value : ""
                                )
                            }
                            isClearable
                        />
                    </div>

                    <div class="form-group mb-3 w-50">
                        <label for="categorie">Nouvelle Categorie</label>
                        <input
                            type="text"
                            class="form-control"
                            value={formikcategorie.values.MAJ}
                            onChange={formikcategorie.handleChange}
                            id=""
                            name="MAJ"
                        />
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" name="book_vehicle" class="btn btn-success">
                        Confirmer
                    </button>
                    <button
                        type="button"
                        name="deletmarqueform"
                        className="btn btn-danger"
                        onClick={() => {
                            if (
                                formikcategorie.values.categorie &&
                                formikcategorie.values.categorie !== "Nouvelle categorie" &&
                                window.confirm(
                                    "Êtes-vous sûr de vouloir supprimer cette categorie ?"
                                )
                            ) {
                                handleDeleteCategorie();
                                handleReset();
                            }
                        }}
                        disabled={
                            !formikcategorie.values.categorie ||
                            formikcategorie.values.categorie === "Nouvelle categorie"
                        }
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </form>
    );
}
