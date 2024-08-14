const express = require("express");
const router = express.Router();
const {
  getAllpermis,
  addPermis,
  getPermis,
  deletePermis,
  updatePermis,
} = require("../../controllers/employe");
router.route("/").get(getAllpermis).post(addPermis);
router.route("/:id").get(getPermis).delete(deletePermis).patch(updatePermis);
module.exports = router;
