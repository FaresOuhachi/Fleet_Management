const express = require("express");
const router = express.Router();

const {
  addVignette,
  getAllVignette,
  updateVignette,
  getVignette,
  deleteVignette,
} = require("../../controllers/vehicule/vignette");

router.route("/").post(addVignette).get(getAllVignette);
router
  .route("/:id")
  .get(getVignette)
  .delete(deleteVignette)
  .patch(updateVignette);

module.exports = router;
