const express = require("express");
const router = express.Router();

const {
  getAllconsomations,
  addConsomation,
  getConsomation,
  deleteConsomation,
  updateConsomation,
  getCarte,
  getAllcartes,
  addCarte,
  updateCarte,
  deleteCarte,
  getAllcartesDisponible,
  getAllcartesNonDisponible,
} = require("../../controllers/vehicule/carburant");
router.route("/").get(getAllconsomations).post(addConsomation);
router
  .route("/:id")
  .get(getConsomation)
  .delete(deleteConsomation)
  .patch(updateConsomation);
module.exports = router;
