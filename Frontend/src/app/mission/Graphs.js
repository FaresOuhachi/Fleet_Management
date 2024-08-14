import React from "react";
import ChartBar from "../Chart/ChartBar";
import ChartLine from "../Chart/ChartLine";
import { useParams } from "react-router-dom";

export default function Graphs() {
  const { id } = useParams();

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Missions</h6>
              {/* <Link className="textprimary">Tous</Link> */}
            </div>
            <ChartBar />
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Consomation Sans-Plomp & Gazoil</h6>
              {/* <Link className="textprimary">Tous</Link> */}
            </div>
            <ChartLine />
          </div>
        </div>
      </div>
    </div>
  );
}
