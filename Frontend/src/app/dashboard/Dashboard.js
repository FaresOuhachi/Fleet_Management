import { Link } from "react-router-dom";
import { TodoListComponent } from "./TodoList";
import ChartBar from "../Chart/ChartBar";
import ChartLine from "../Chart/ChartLine";
import { TableauVoirMission } from "../mission/Voir";

function Dashboard() {
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row">
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white o-hidden h-100 primary2">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fas fa-fw fa-users"></i>
                </div>
                <div className="mr-5">
                  <span className="badge primary2">5</span>
                  Users
                </div>
              </div>
              <Link className="card-footer text-white clearfix small z-1">
                <span className="float-left">Voir Details</span>
                <span className="float-right">
                  <i className="fas fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white o-hidden h-100 primary2">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fas fa-fw fa fa-id-card"></i>
                </div>

                <div className="mr-5">
                  <span className="badge primary2">20</span> Chauffeurs
                </div>
              </div>
              <Link
                to={"/chauffeur/Voir"}
                className="card-footer text-white clearfix small z-1"
              >
                <span className="float-left">Voir Details</span>
                <span className="float-right">
                  <i className="fas fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white o-hidden h-100 primary2">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fas fa-fw fa fa-bus"></i>
                </div>

                <div className="mr-5">
                  <span className="badge primary2">30</span> Vehicules
                </div>
              </div>
              <Link
                to={"/vehicule/Voir"}
                className="card-footer text-white clearfix small z-1"
              >
                <span className="float-left">Voir Details</span>
                <span className="float-right">
                  <i className="fas fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 mb-3">
            <div className="card text-white o-hidden h-100 primary2">
              <div className="card-body">
                <div className="card-body-icon">
                  <i className="fas fa-fw fa fa-address-book"></i>
                </div>

                <div className="mr-5">
                  <span className="badge primary2">40</span> Missions
                </div>
              </div>
              <Link
                to={"/mission/Voir"}
                className="card-footer text-white clearfix small z-1"
              >
                <span className="float-left">Voir details</span>
                <span className="float-right">
                  <i className="fas fa-angle-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Missions</h6>
                <Link className="textprimary">Tous</Link>
              </div>
              <ChartBar />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Consomation Sans-Plomp & Gazoil</h6>
                <Link className="textprimary">Tous</Link>
              </div>
              <ChartLine />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-4 px-4">
        <div className="bg-secondary text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Missions Recentes</h6>
            <Link className="textprimary" to={"/mission/Voir"}>
              Tous
            </Link>
          </div>

          <TableauVoirMission />
        </div>
      </div>

      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-md-6">
            <div className="h-100 bg-secondary rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Calendrier</h6>
                <Link className="textprimary">Tous</Link>
              </div>
              <div id="calender"></div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="h-100 bg-secondary rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">To Do List</h6>
                <Link className="textprimary">Tous</Link>
              </div>
              <TodoListComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
