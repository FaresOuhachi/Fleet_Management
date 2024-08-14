const mongoose = require("mongoose");
const { Vehicule } = require("./Vehicule");
const { Employe, Chaufeur } = require("../controllers/employe");
const CarteSchema = new mongoose.Schema({
  numero: {
    type: Number,
    match: [/^\d{12}$/, "provide valid card number"],
  },
});

const ConsomationSchema = new mongoose.Schema({
  carte: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carte",
    required: true,
  },
  cout: {
    type: Number,
    required: [true, "provide the price"],
  },
  quantite: {
    type: Number,
    required: [true, "provide the quantity"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  chauffaur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chaufeur",
  },
});
const Carte = mongoose.model("Carte", CarteSchema);
const Consomation = mongoose.model("Consomation", ConsomationSchema);

module.exports = {
  Consomation,
  Carte,
};
