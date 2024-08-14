const express = require("express");
const router = express.Router();

const {
  getAllFDR,
  getFDR,
  addFDR,
  updateFDR,
  deleteFDR,
} = require("../controllers/fdr");

router.route("/").get(getAllFDR).post(addFDR);
router.route("/:id").get(getFDR).delete(deleteFDR).patch(updateFDR);

module.exports = router;
