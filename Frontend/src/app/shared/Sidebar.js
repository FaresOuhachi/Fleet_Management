import { Link } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "../dashboard/Dashboard";
import React from "react";

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentPath: "",
  //   };
  // }

  // componentDidMount() {
  //   this.setState({
  //     currentPath: window.location.pathname,
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location.pathname !== prevProps.location.pathname) {
  //     this.setState({
  //       currentPath: window.location.pathname,
  //     });
  //   }
  // }

  render() {
    return (
      <div id="sidebar" className="sidebar sidebar-offcanvas pe-4 pb-3">
        <nav className="navbar bgsecondary navbar-dark">
          <Link to={"/"} className="navbar-brand mx-4 mb-3">
            <h3
              className="textprimary d-flex align-items-center"
              style={{ color: "#f5821f" }}
            >
              <img
                src="../img/Sonatrach-logo.ico"
                alt="Icône"
                width="50px"
                height="50px"
                className="mx-3"
              />
              Parc Auto
            </h3>
          </Link>

          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src="../img/usher.jpg"
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">Khireddine</h6>
              <span>Admin</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            <Link to={"/"} className="nav-item nav-link">
              {/* <Link
              to="/"
              className={this.state.currentPath === "/" ? "nav-item nav-link active" : "nav-item nav-link"}
            > </Link> */}
              <i className="fa fa-tachometer-alt me-2"></i>Tableau de Bord
            </Link>
            {/*     
          <a href="../DemandeTransport.html" className="nav-item nav-link">
            <i className="fa fa-th me-2"></i>Demande
          </a>
*/}
            <div className="nav-item dropdown">
              <span
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-fw fa-book me-2"></i>Missions
              </span>
              <div className="dropdown-menu bg-transparent border-0">
                <Link to={"/mission/Ajouter"} className="dropdown-item">
                  Ajouter
                </Link>
                <Link to={"/mission/Voir"} className="dropdown-item">
                  Voir
                </Link>
                <Link to={"/mission/Gerer"} className="dropdown-item">
                  Gérer
                </Link>
              </div>
            </div>

            <div className="nav-item dropdown">
              <span
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-fw fa-id-card me-2"></i>Chauffeurs
              </span>
              <div className="dropdown-menu bg-transparent border-0">
                <Link Link to={"/chauffeur/Ajouter"} className="dropdown-item">
                  Ajouter
                </Link>
                <Link Link to={"/chauffeur/Voir"} className="dropdown-item">
                  Voir
                </Link>
                <Link Link to={"/chauffeur/Gerer"} className="dropdown-item">
                  Gérer
                </Link>
              </div>
            </div>

            <div className="nav-item dropdown ">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-fw fa-bus me-2"></i>Vehicules
              </span>
              <div className="dropdown-menu bg-transparent border-0">
                <Link to={"/vehicule/Ajouter"} className="dropdown-item">
                  Ajouter
                </Link>
                <Link to={"/vehicule/Voir"} className="dropdown-item">
                  Voir
                </Link>
                <Link to={"/vehicule/Gerer"} className="dropdown-item">
                  Gérer
                </Link>
              </div>
            </div>

            {/* <a href="../DemandeReparation.html" className="nav-item nav-link">
            <i className="fa fa-th me-2"></i>Reparation
          </a>

          <a href="../DemandeAssurance.html" className="nav-item nav-link">
            <i className="fa fa-th me-2"></i>Assurance
          </a> */}
          </div>
        </nav>
      </div>
    );
  }
}

export default Sidebar;
