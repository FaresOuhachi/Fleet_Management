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

import { useQuery } from "react-query";
import axios from "axios";

import { FaSearch } from "react-icons/fa";
import {
  TableauVoirVehicule,
  TableauVoirVehiculeRecherche,
  VehiculeRechercheAvance,
  BarreNavigation,
} from "./composant";
import { isDisabled } from "@testing-library/user-event/dist/utils";

//

//data
const ListeVehicule = Data.Vehicules;
const Listemarque = Data.marque;
const Listemodele = Data.modele;
const ListeTypeCarburant = Data.Type_Carburant;
const Listecategorie = Data.Categories_permis;
const ListeEtatVehicule = Data.etatV;

//
const fetchData = async () => {
  const response = await axios.get("localhost:5000/api/v1/vehicule"); // Remplacez l'URL
  return response.data;
};

//

//

//

export default function VoirV() {
  //

  //

  //

  const [barre, setbarre] = useState(true);
  const [button, setbutton] = useState("Recherche Avancée");
  const [searchTerm, setSearchTerm] = useState("");
  const [vehiculesFiltres, setVehiculesFiltres] = useState([]);
  const [vehiculesFiltres2, setVehiculesFiltres2] = useState([]);
  const [vehiculesFiltresfinal, setVehicleFiltresfinal] = useState([]);

  // if (barre === true) {
  //   setbutton("Recherche Avancée");
  //   setVehicleFiltresfinal(vehiculesFiltres);
  // } else {
  //   setVehicleFiltresfinal(vehiculesFiltres2);
  //   setbutton("Recherche Simple");
  // }
  useEffect(() => {
    if (barre === true) {
      setbutton("Recherche Avancée");
      setVehicleFiltresfinal(vehiculesFiltres);
    } else {
      setVehicleFiltresfinal(vehiculesFiltres2);
      setbutton("Recherche Simple");
    }
  }, [barre]);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="">
        <ol className="breadcrumb bg-secondary p-2 rounded ">
          <li className="breadcrumb-item">
            <span className="textprimary">Vehicules</span>
          </li>
          <li className="breadcrumb-item active">Voir</li>
          {barre ? (
            <BarreNavigation
              setSearchTerm={setSearchTerm}
              setVehiculesFiltres={setVehiculesFiltres}
              barre={barre}
            />
          ) : null}
          <button
            onClick={() => {
              setbarre((barre) => !barre);
              setSearchTerm("");
            }}
          >
            {button}
          </button>
        </ol>

        {barre === false ? (
          <>
            {" "}
            <VehiculeRechercheAvance
              setVehiculesFiltres2={setVehiculesFiltres2}
              barre={barre}
            />{" "}
            <br />{" "}
          </>
        ) : (
          <hr />
        )}

        <div className="card bg-secondary h-75 text-white">
          <div className="card-header">
            <i className="fas fa-table me-2"></i>Voir Vehicules
          </div>

            <TableauVoirVehicule />

          <div className="card-footer small text-muted">
            <span>Mis a jour le : 05-03-2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// export function TableauVoirVehicule() {
//   // const { data, isLoading, isError, error } = useQuery("data", fetchData);

//   // if (isLoading) {
//   //   return <div>Chargement..</div>;
//   // }

//   // if (isError) {
//   //   return <div>Erreur: {error.message}</div>;
//   // }
//   return (
//     <div className="card-body">
//       <div className="table-responsive">
//         <table
//           className="table table-bordered table-striped table-hover"
//           id="dataTable"
//           width="100%"
//           cellspacing="0"
//         >
//           <thead>
//             <tr className="text-white">
//               <th>#</th>
//               <th>Matricules</th>
//               <th>Marques</th>
//               <th>Modeles</th>
//               <th>Types Carburant</th>
//               <th>Categories</th>
//               <th>Nbr Passagers Max</th>
//               <th>Controle Technique</th>
//               <th>Etats</th>
//               <th>Consulter</th>
//             </tr>
//           </thead>

//           <tbody>
//             {ListeVehicule.map((v) => (
//               <tr key={v.id}>
//                 <td>{v.id}</td>
//                 <td>{v.matricule}</td>
//                 <td>{v.marque}</td>
//                 <td>{v.modele}</td>
//                 <td>{v.typecarburant}</td>
//                 <td>{v.categories}</td>
//                 <td>{v.nombreplacemax}</td>
//                 <td>{v.datecontroleTechnique}</td>

//                 <td>
//                   <span
//                     className={`badge ${
//                       v.etat === "Pret" ? "badge-success" : "badge-danger"
//                     }`}
//                   >
//                     {v.etat}
//                   </span>
//                 </td>

//                 <td>
//                   <Link
//                     to={`/vehicule/${v.id}/Graphs`}
//                     class="badge bg-info text-decoration-none text-white"
//                   >
//                     <i class="fa fa-check"></i>Consulter
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
