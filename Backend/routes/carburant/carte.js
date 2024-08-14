const express = require("express");
const router = express.Router();
const {
  getCarte,
  getAllcartes,
  addCarte,
  updateCarte,
  deleteCarte,
  getAllcartesDisponible,
  getAllcartesNonDisponible,
} = require("../../controllers/vehicule/carburant");
router.route("/").get(getAllcartes).post(addCarte);
router.route("/:id").get(getCarte).delete(deleteCarte).patch(updateCarte);
module.exports = router;
