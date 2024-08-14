const express = require("express");
const router = express.Router();
const {
  addCategorie,
  getAllCategorie,
  updateCategorie,
  getCategorie,
  deleteCategorie,
} = require("../../controllers/vehicule/categorie");

router.route("/").post(addCategorie).get(getAllCategorie);
router
  .route("/:id")
  .get(getCategorie)
  .delete(deleteCategorie)
  .patch(updateCategorie);

module.exports = router;
