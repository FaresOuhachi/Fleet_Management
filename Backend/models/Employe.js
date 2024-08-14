const mongoose = require("mongoose");
const { Categorie } = require("./Vehicule");

const EmployeSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: [true, "must provide matricule"],
    trim: true,
    unique: true,
  },
  nom: {
    type: String,
    required: [true, "must provide nom"],
    trim: true,
  },
  prenom: {
    type: String,
    required: [true, "must provide prenom"],
    trim: true,
  },
  departement: {
    type: String,
    trim: true,
  },
  dateNaissance: {
    type: Date,
    required: [true, "must provide dateNaissance"],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  telephone: {
    type: String, // Modifier le type en String
    trim: true, // Ajouter l'option trim pour supprimer les espaces inutiles
  },
  job: {
    type: String, // Ajoutez ici les rôles valides
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employe",
    default: null,
  },
});
const Employe = mongoose.model("Employe", EmployeSchema);

const PermisSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: [true, "must provide numero"],
    trim: true,
    unique: true,
  },
  finValidite: {
    type: Date,
    required: [true, "must provide finValidite"],
  },
  categorie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
  ],
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const Permis = mongoose.model("Permis", PermisSchema);

const ChauffeurSchema = new mongoose.Schema({
  permis: { type: mongoose.Schema.Types.ObjectId, ref: "Permis" },
  etatChaufeur: {
    type: String,
  },
});

const Chaufeur = Employe.discriminator("Chauffeur", ChauffeurSchema);
module.exports = {
  Chaufeur,
  Employe,
  Permis,
};
