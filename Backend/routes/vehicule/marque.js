const express = require("express");
const router = express.Router();

const {
  addMarque,
  getAllMarque,
  updateMarque,
  getMarque,
  deleteMarque,
} = require("../../controllers/vehicule/marque");
router.route("/").post(addMarque).get(getAllMarque);
router.route("/:id").get(getMarque).delete(deleteMarque).patch(updateMarque);

module.exports = router;
