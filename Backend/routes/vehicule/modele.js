const express = require("express");
const router = express.Router();

const {
  addModele,
  getAllModele,
  updateModele,
  getModele,
  deleteModele,
} = require("../../controllers/vehicule/modele");

router.route("/").post(addModele).get(getAllModele);
router.route("/:id").get(getModele).delete(deleteModele).patch(updateModele);

module.exports = router;
