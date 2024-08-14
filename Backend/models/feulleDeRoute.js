const mongoose = require("mongoose");
const { Chauffeur, Employe } = require("./Employe");
const { Vehicule } = require("./Vehicule");

const feuilleDeRouteSchema = new mongoose.Schema({
  chauffeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chauffeur",
    required: [true, "must provide chauffeur"],
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
    required: [true, "must provide vehicule"],
  },
  ddt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "demandeTransport",
    required: [true, "must provide ddt"],
  },
  carte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carte",
  },
  kilometrageDepart: {
    type: Number,
  },
  kilometrageRetour: {
    type: Number,
    default: null,
  },
  BonVrac: {
    type: Number,
  },
  cout: {
    type: Number,
    default: null,
  },
  fdrApproved: {
    type: String,
    enum: ["Approuver", "En-Attente", "Refuser"],
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employe",
    default: null,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const feuilleDeRoute = mongoose.model("feuilleDeRoute", feuilleDeRouteSchema);

module.exports = { feuilleDeRoute };
