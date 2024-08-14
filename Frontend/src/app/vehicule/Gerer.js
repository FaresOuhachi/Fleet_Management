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
import { useMutation } from "react-query";
import axios from "axios";
import { QueryClient, useQuery, QueryClientProvider } from "react-query";
import Select from "react-select";
import { queryCache } from "react-query";
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
const queryClient = new QueryClient();
//data

//
const fetchVehicules = async () => {
  const response = await axios.get("/api/vehicules");
  return response.data;
};
const updateEtatVehicule = async (id, etat) => {
  const response = await axios.put(`/api/vehicules/${id}`, { etat });
  return response.data;
};

export default function GererV() {
  //
  const ListeVehicule = Data.Vehicules;
  const Listemarque = Data.marque;
  const Listemodele = Data.modele;
  const ListeTypeCarburant = Data.Type_Carburant;
  const Listecategorie = Data.Categories_permis;
  const ListeEtatVehicule = Data.etatV;

  //
  const optionsetat = ListeEtatVehicule.map((e) => ({
    value: e.name,
    label: e.name,
  }));
  //
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [updatedValues, setUpdatedValues] = useState({});

  //

  const mutation = useMutation(updateEtatVehicule, {
    onSuccess: () => {
      queryClient.invalidateQueries("vehicules");
      toast.success("Les valeurs ont été mises à jour avec succès !");
    },
    onError: () => {
      toast.error(
        "Une erreur s'est produite lors de la mise à jour des valeurs."
      );
    },
  });

  const handleUpdate = () => {
    mutation.mutate(updatedValues);
    toast.success("Les valeurs ont été mises à jour avec succès !");
  };

  //
  const handleCheckboxChange = (event, vehicleId) => {
    if (event.target.checked) {
      setSelectedVehicles((prevSelectedVehicles) => [
        ...prevSelectedVehicles,
        vehicleId,
      ]);
    } else {
      setSelectedVehicles((prevSelectedVehicles) =>
        prevSelectedVehicles.filter((id) => id !== vehicleId)
      );
    }
  };

  // const handleEtatChange = (event, id) => {
  //   const { name, value } = event.target;
  //   setUpdatedValues((prevState) => ({
  //     ...prevState,
  //     [id]: { ...prevState[id], [name]: value },
  //   }));
  // };
  const handleEtatChange = (event, id) => {
    const { name, value } = event.target;
    setUpdatedValues((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], [name]: value },
    }));
  };

  //

  const deleteVehicles = async (ids) => {
    try {
      const response = await axios.delete("/api/vehicles", {
        data: { ids },
      });
      setDeletedIds(response.data.deletedIds);
      setSelectedVehicles([]);
      toast.success("Suppression réussie !");
    } catch (error) {
      console.error(error);
      toast.error("Échec de la suppression !");
    }
  };

  //

  const deleteVehiclesMutation = useMutation(deleteVehicles);

  const handleDelete = () => {
    deleteVehiclesMutation.mutate(selectedVehicles);
    //toast.success("Suppression réussie !");
    console.log("suppression : ", selectedVehicles);
  };

  //recuperer les donner depuis le backend
  const { data: ListeVehicules, isLoading } = useQuery("vehicles", async () => {
    const response = await axios.get("/api/vehicles");
    return response.data;
  });
  //
  // const { data: vehicules, isLoading } = useQuery('vehicules', fetchVehicules);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  //

  return (
    <>
      <ToastContainer />
      <div className="container-fluid pt-4 px-4">
        <div className="vh-100">
          <ol className="breadcrumb bg-secondary p-2 rounded">
            <li className="breadcrumb-item">
              <span className="textprimary">Vehicules</span>
            </li>
            <li className="breadcrumb-item active">Gerer</li>
          </ol>
          <hr />

          <div className="card bg-secondary h-75 text-white">
            <div className="card-header">
              <i className="fas fa-table"></i>Gerer Vehicules
            </div>

            <div className="card-body">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-striped table-hover"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead>
                    <tr className="text-white">
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            ListeVehicule.length > 0 &&
                            selectedVehicles.length === ListeVehicule.length
                          }
                          onChange={(event) => {
                            if (event.target.checked) {
                              const allVehicleIds = ListeVehicule.map(
                                (v) => v.id
                              );
                              setSelectedVehicles(allVehicleIds);
                            } else {
                              setSelectedVehicles([]);
                            }
                          }}
                        />
                      </th>
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
                    {ListeVehicule.map((v, index) => (
                      <tr key={v.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedVehicles.includes(v.id)}
                            onChange={(event) =>
                              handleCheckboxChange(event, v.id)
                            }
                          />
                        </td>
                        <td>{v.id}</td>
                        <td>{v.matricule}</td>
                        <td>{v.marque}</td>
                        <td>{v.modele}</td>
                        <td>{v.typecarburant}</td>
                        <td>{v.categories}</td>
                        <td>{v.nombreplacemax}</td>
                        <td>{v.datecontroleTechnique}</td>

                        <Select
                          id="etatvehicule"
                          name="etatvehicule"
                          className=" mb-3"
                          options={optionsetat}
                          value={
                            updatedValues[v.id]?.etat
                              ? {
                                  value: updatedValues[v.id]?.etat,
                                  label: updatedValues[v.id]?.etat,
                                }
                              : { value: v.etat, label: v.etat }
                          }
                          onChange={(selectedOption) => {
                            const selectedValue = selectedOption
                              ? selectedOption.value
                              : "";
                            setUpdatedValues((prevState) => ({
                              ...prevState,
                              [v.id]: {
                                ...prevState[v.id],
                                etat: selectedValue,
                              },
                            }));
                          }}
                        />
                        <td>
                          <Link
                            to={`/vehicule/Gerer/${v.id}/MAJ`}
                            className="badge bg-info"
                          >
                            <i className="fa fa-check"></i>Mettre a jour
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              {/* <button onClick={() => console.log(updatedValues)}>
                Afficher les valeurs sélectionnées
              </button> */}

              <button
                type="submit"
                name="submitetat"
                onClick={handleUpdate}
                className="btn btn-success m-lg-4"
              >
                Confirmer
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger m-lg-4"
                disabled={selectedVehicles.length === 0}
              >
                Supprimer
              </button>
            </div>
            <div className="card-footer small text-muted">
              <span>Mis a jour le : 05-03-2023</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
