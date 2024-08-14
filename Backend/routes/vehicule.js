const express = require("express");
const router = express.Router();
const authorization = require("../middlewares/authorization");
const auth = require("../middlewares/authentication");

const {
    getAllVehicules,
    getVehicule,
    addVehicule,
    updateVehicule,
    deleteVehicule,
} = require("../controllers/vehicule");

const categorieRouter = require("./vehicule/categorie");
const marqueRouter = require("./vehicule/marque");
const modeleRouter = require("./vehicule/modele");
const maisonRouter = require("./vehicule/maison");
const vignetteRouter = require("./vehicule/vignette");
const assuranceRouter = require("./vehicule/assurance");
const ctRouter = require("./vehicule/ct");
const reparationRouter = require("./vehicule/reparation");
const passport = require("passport");

router.use("/categorie", categorieRouter);
router.use("/marque", marqueRouter);
router.use("/modele", modeleRouter);
router.use("/maison", maisonRouter);
router.use("/vignette", vignetteRouter);
router.use("/assurance", assuranceRouter);
router.use("/ct", ctRouter);
router.use("/reparation", reparationRouter);

router.route("/").get(getAllVehicules).post(addVehicule);

router
    .route("/:id")
    .get(getVehicule)
    .patch(updateVehicule)
    .delete(deleteVehicule);

module.exports = router;
