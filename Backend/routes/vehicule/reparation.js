const express = require("express");
const router = express.Router();

const {
  addReparation,
  getAllReparation,
  updateReparation,
  getReparation,
  deleteReparation,
} = require("../../controllers/vehicule/reparation");

router.route("/").post(addReparation).get(getAllReparation);
router
  .route("/:id")
  .get(getReparation)
  .delete(deleteReparation)
  .patch(updateReparation);

module.exports = router;
