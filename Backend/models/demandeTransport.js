const mongoose = require("mongoose");
const { Chauffeur, Employe } = require("./Employe");

const demandeTransportSchema = new mongoose.Schema({
  demanderPar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employe",
  },
  passagers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employe",
      required: [true, "must provide passager"],
    },
  ],
  dateDepart: {
    type: Date,
    default: Date.now(),
    required: [true, "must provide dateDepart"],
  },
  dateRetour: {
    type: Date,
  },
  Motif: {
    type: String,
    trim: true,
    required: [true, "must provide Motif"],
  },
  Destination: {
    type: String,
    trim: true,
    required: [true, "must provide Destination"],
  },
  demandeApproved: {
    type: String,
    enum: ["Approuver", "En-Attente", "Refuser"],
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employe",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const demandeTransport = mongoose.model(
  "demandeTransport",
  demandeTransportSchema
);

module.exports = {
  demandeTransport,
};
