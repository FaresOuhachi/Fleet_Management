// const { Vehicule, Marque, Categorie, Maison } = require("../models/Vehicule");
const {Vehicule, Marque, Modele} = require("../models/Vehicule");

const getAllVehicules = async (req, res) => {
    let filters = {};

    // add filter for matricule
    if (req.query.matricule) {
        filters.matricule = req.query.matricule;
    }

    // add filter for modele
    if (req.query.modele) {
        filters.modele = req.query.modele;
    }

    // add filter for marque
    if (req.query.marque) {
        const modeles = await Modele.find({marque: req.query.marque});
        filters.modele = {$in: modeles.map((m) => m._id)};
    }

    // add filter for categorie
    if (req.query.categorie) {
        const modeles = await Modele.find({categorie: req.query.categorie});
        filters.modele = {$in: modeles.map((m) => m._id)};
    }

    const vehicules = await Vehicule.find(filters)
        .populate({
            path: "modele",
            populate: [{path: "marque"}, {path: "categorie"}],
        })
        .populate("CreatedBy");
    res.status(200).json({vehicules});
};

const getVehicule = async (req, res) => {
    const {id: _id} = req.params;
    const vehicule = await Vehicule.findById(_id).populate({
        path: "modele",
        populate: {path: "marque"},
    });
    if (!vehicule) {
        return res.status(404).json({message: "Vehicule not found"});
    }
    res.status(200).json({vehicule});
};

const addVehicule = async (req, res) => {
    try {
        const modele = await Modele.findById(req.body.modele);
        if (!modele) {
            return res.status(404).json({message: "Modele not found"});
        }
        const vehicule = await Vehicule.create(req.body);
        res.status(201).json(vehicule);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const updateVehicule = async (req, res) => {
    try {
        const modele = await Modele.findById(req.body.modele);
        if (!modele) {
            return res.status(404).json({message: "Modele not found"});
        }
        const vehicule = await Vehicule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(201).json(vehicule);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const deleteVehicule = async (req, res) => {
    const {id: _id} = req.params;
    const vehicule = await Vehicule.findByIdAndDelete(_id);
    if (!vehicule) {
        return res.status(404).json({message: "Vehicule not found"});
    }
    res.status(200).json({vehicule});
};

module.exports = {
    getAllVehicules,
    getVehicule,
    addVehicule,
    updateVehicule,
    deleteVehicule,
};
