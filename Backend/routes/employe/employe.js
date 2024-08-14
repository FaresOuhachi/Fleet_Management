const express = require("express");
const router = express.Router();
const {
  updateChauffeur,
  getAllpermis,
  getPermis,
  addPermis,
  deletePermis,
  getAllemployes,
  updateEmploye,
  getEmploye,
  deleteEmploye,
  addEmploye,
  getAllchauffeurs,
  addChauffeur,
  getChauffeur,
  deleteChauffeur,
  updatePermis,
} = require("../../controllers/employe");
router.route("/").get(getAllemployes).post(addEmploye);
router.route("/chauffeur/").get(getAllchauffeurs).post(addChauffeur);
router.route("/permis/").get(getAllpermis).post(addPermis);
router
  .route("/chauffeur/:id")
  .get(getChauffeur)
  .delete(deleteChauffeur)
  .patch(updateChauffeur);
router
  .route("/permis/:id")
  .get(getPermis)
  .delete(deletePermis)
  .patch(updatePermis);

router.route("/:id").get(getEmploye).delete(deleteEmploye).patch(updateEmploye);
module.exports = router;
