const mongoose = require("mongoose");
const MaisonSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  addresse: {
    type: String,
    required: [true, "must provide adresse"],
    trim: true,
  },
  telephone: {
    type: Number,
    // required: [true, "must provide telephone"],
    trim: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const MarqueSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "must provide nom"],
    trim: true,
    maxlength: [20, "nom can not be more than 20 characters"],
  },
  maison: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Maison",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});
const CategorieSchema = new mongoose.Schema({
  cat: {
    type: String,
    required: [true, "must provide categorie"],
    trim: true,
  },
});

const ModeleSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, "must provide nom"],
    trim: true,
  },

  places: {
    type: Number,
    required: [true, "must provide number of places"],
  },
  marque: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marque",
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

const VehiculeSchema = new mongoose.Schema({
  matricule: {
    type: String,
    required: [true, "must provide matricule"],
    trim: true,
    length: [11, "matricule must be 11 characters"],
  },
  modele: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Modele",
  },
  kilometrage: {
    type: Number,
  },
  carburant: {
    type: String,
    enum: ["Essence", "Diesel"],
  },
  dateassu: {
    type: Date,
  },
  datectrl: {
    type: Date,
  },
  etat: {
    type: String,
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

const VignetteSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  montant: {
    type: Number,
    required: [true, "must provide price of vignette"],
  },
  delai: {
    type: Date,
    required: [true, "must provide the delai"],
    // default: next year
  },
});

const AssuranceSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  montant: {
    type: Number,
  },
  delai: {
    type: Date,
    required: [true, "must provide the delai"],
  },

  agence: {
    type: String,
  },
  typeContrat: {
    type: String,
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

const CTSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  montant: {
    type: Number,
    required: [true, "must provide price of ct"],
  },
  delai: {
    type: Date,
    required: [true, "must provide the delai"],
    // default: next year
  },
  //change this thing's name
  agencect: {
    type: String,
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
const reparationSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  montant: Number,
  nature: String,
  anomalie: String,
  dateDebut: Date,
  dateFin: {
    type: Date,
    default: this.dateDebut,
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
const accidentSchema = new mongoose.Schema({
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule",
  },
  date: {
    type: Date,
  },
  lieu: {
    type: String,
  },
  degatsMateriels: {
    type: String,
  },
  degatsCorporels: {
    type: String,
  },
  chauffeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chauffeur",
  },
});
//
const Vehicule = mongoose.model("Vehicule", VehiculeSchema);
const Categorie = mongoose.model("Categorie", CategorieSchema);
const Marque = mongoose.model("Marque", MarqueSchema);
const Maison = mongoose.model("Maison", MaisonSchema);
const Modele = mongoose.model("Modele", ModeleSchema);

const Vignette = mongoose.model("Vignette", VignetteSchema);
const Assurance = mongoose.model("Assurance", AssuranceSchema);
const CT = mongoose.model("CT", CTSchema);
const Reparation = mongoose.model("Reparation", reparationSchema);

module.exports = {
  Vehicule,
  Categorie,
  Marque,
  Maison,
  Modele,
  Vignette,
  Assurance,
  CT,
  Reparation,
};
