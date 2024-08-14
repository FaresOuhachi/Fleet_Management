const express = require("express");
const router = express.Router();
const {
  getAllchauffeurs,
  addChauffeur,
  getChauffeur,
  deleteChauffeur,
  updateChauffeur,
} = require("../../controllers/employe");
router.route("/").get(getAllchauffeurs).post(addChauffeur);
router
  .route("/:id")
  .get(getChauffeur)
  .delete(deleteChauffeur)
  .patch(updateChauffeur);
module.exports = router;
