const express = require("express");
const router = express.Router();

const ROLES_LIST = require("../config/roles");
const verifyRoles = require("../middlewares/verifyRoles");

const {
  getAllDemandesT,
  getDemandesT,
  addDemandesT,
  updateDemandesT,
  deleteDemandesT,
} = require("../controllers/demandeTransport");

router
  .route("/")
  .get(
    // verifyRoles(ROLES_LIST.admin,ROLES_LIST.secretary),
    getAllDemandesT
  )
  .post(
    // verifyRoles(ROLES_LIST.admin,ROLES_LIST.secretary),
    addDemandesT
  );
router
  .route("/:id")
  .get(getDemandesT)
  .delete(deleteDemandesT)
  .patch(updateDemandesT);

module.exports = router;
