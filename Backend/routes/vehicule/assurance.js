const express = require("express");
const router = express.Router();

const {
  addAssurance,
  getAllAssurance,
  updateAssurance,
  getAssurance,
  deleteAssurance,
} = require("../../controllers/vehicule/assurance");

router.route("/").post(addAssurance).get(getAllAssurance);

router
  .route("/:id")
  .get(getAssurance)
  .delete(deleteAssurance)
  .patch(updateAssurance);

module.exports = router;
