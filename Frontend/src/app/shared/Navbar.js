import { useState } from "react";
import Sidebar from "./Sidebar";
import { open, setopen } from "../App";

function Navbar() {
  const toggleOffcanvas = () => {
    document
      .querySelectorAll(".sidebar-offcanvas")
      .forEach((el) => el.classList.toggle("open"));
  };
  return (
    <nav
      id="barrenavigation"
      className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0"
    >
      <a href="../index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="textprimary mb-0">
          <i className="fa fa-user-edit"></i>
        </h2>
      </a>
      <button
        href="#"
        className="textprimary sidebar-toggler flex-shrink-0"
        onClick={() => toggleOffcanvas()}
      >
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-md-flex ms-4">
        <input
          id="search"
          className="form-control bg-dark border-0"
          type="search"
          placeholder="Rechercher"
        />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-envelope me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="../img/uhser.jpg"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">
                    Fares Vous a envoyer un message
                  </h6>
                  <small>15 min</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="../img/usjer.jpg"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">
                    Fares Vous a envoyer un message
                  </h6>
                  <small>15 min</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle"
                  src="../img/usejr.jpg"
                  alt=""
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">
                    Fares Vous a envoyer un message
                  </h6>
                  <small>15 min</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">
              Tous les messages
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notifications</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile a jour</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Nouveau user ajouter</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Mot de passe change</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">
              Tous les notifications
            </a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              className="rounded-circle me-lg-2"
              src="../img/usher.jpg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <span className="d-none d-lg-inline-flex">Khireddine</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              Mon Profile
            </a>
            <a href="#" className="dropdown-item">
              Parametres
            </a>
            <a href="#" className="dropdown-item">
              Se deconnecter
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
