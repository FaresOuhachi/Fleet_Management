const express = require("express");
const {
  getMaison,
  deleteMaison,
  addMaison,
  getAllMaison,
  updateMaison,
} = require("../../controllers/vehicule/maison");
const router = express.Router();
router.route("/").post(addMaison).get(getAllMaison);
router.route("/:id").get(getMaison).delete(deleteMaison).patch(updateMaison);

module.exports = router;
