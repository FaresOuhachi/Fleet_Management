const express = require("express");
const router = express.Router();

const {
  addCT,
  getAllCT,
  updateCT,
  getCT,
  deleteCT,
} = require("../../controllers/vehicule/ct");

router.route("/").post(addCT).get(getAllCT);
router.route("/:id").get(getCT).delete(deleteCT).patch(updateCT);

module.exports = router;
