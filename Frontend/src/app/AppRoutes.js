import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Spinner from "./shared/Spinner";

export default function AppRoutes() {
    const Dashboard = lazy(() => import("./dashboard/Dashboard"));

    const AjouterV = lazy(() => import("./vehicule/Ajouter"));
    const VoirV = lazy(() => import("./vehicule/Voir"));
    const GererV = lazy(() => import("./vehicule/Gerer"));
    const ConsulterV = lazy(() => import("./vehicule/Consulter"));
    const InfosV = lazy(() => import("./vehicule/Infos"));
    const GraphsV = lazy(() => import("./vehicule/Graphs"));
    const MissionV = lazy(() => import("./vehicule/Mission"));
    const MAJV = lazy(() => import("./vehicule/MAJ"));

    //

    const AjouterM = lazy(() => import("./mission/Ajouter"));
    const VoirM = lazy(() => import("./mission/Voir"));
    const GererM = lazy(() => import("./mission/Gerer"));
    const ConsulterM = lazy(() => import("./mission/Consulter"));
    const InfosM = lazy(() => import("./mission/Infos"));
    const GraphsM = lazy(() => import("./mission/Graphs"));
    const MAJM = lazy(() => import("./mission/MAJ"));

    const AjouterC = lazy(() => import("./chauffeur/Ajouter"));
    const VoirC = lazy(() => import("./chauffeur/Voir"));
    const GererC = lazy(() => import("./chauffeur/Gerer"));
    const ConsulterC = lazy(() => import("./chauffeur/Consulter"));
    const InfosC = lazy(() => import("./chauffeur/Infos"));
    const GraphsC = lazy(() => import("./chauffeur/Graphs"));
    const MissionC = lazy(() => import("./chauffeur/Mission"));
    const MAJC = lazy(() => import("./chauffeur/MAJ"));

    //

    //

    return (
        <Suspense fallback={<Spinner/>}>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/vehicule/Ajouter" element={<AjouterV/>}/>
                <Route path="/vehicule/Voir" element={<VoirV/>}/>
                <Route path="/vehicule/Gerer/" element={<GererV/>}/>
                <Route path="/vehicule/Gerer/:id/MAJ" element={<MAJV/>}/>
                <Route path="/vehicule/:id" element={<ConsulterV/>}>
                    <Route path="Graphs" element={<GraphsV/>}/>
                    <Route path="Infos" element={<InfosV/>}/>
                    <Route path="Mission" element={<MissionV/>}/>
                </Route>

                {/* /mission/${mission.id}/Graphs  */}

                <Route path="/mission/Ajouter" element={<AjouterM/>}/>
                <Route path="/mission/Voir" element={<VoirM/>}/>
                <Route path="/mission/Gerer/" element={<GererM/>}/>
                <Route path="/mission/Gerer/:id/MAJ" element={<MAJM/>}/>
                <Route path="/mission/:id" element={<ConsulterM/>}>
                    <Route path="Graphs" element={<GraphsM/>}/>
                    <Route path="Infos" element={<InfosM/>}/>
                </Route>

                <Route path="/chauffeur/Ajouter" element={<AjouterC/>}/>
                <Route path="/chauffeur/Voir" element={<VoirC/>}/>
                <Route path="/chauffeur/Gerer/" element={<GererC/>}/>
                <Route path="/chauffeur/Gerer/:id/MAJ" element={<MAJC/>}/>
                <Route path="/chauffeur/:id" element={<ConsulterC/>}>
                    <Route path="Graphs" element={<GraphsC/>}/>
                    <Route path="Infos" element={<InfosC/>}/>
                    <Route path="Mission" element={<MissionC/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
}
