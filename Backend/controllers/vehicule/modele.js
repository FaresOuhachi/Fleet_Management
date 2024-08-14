// crud for modele
const {Modele, Marque} = require("../../models/Vehicule");
const getAllModele = async (req, res) => {
    const {marque, categorie, minPlaces, maxPlaces} = req.query;

    const filter = {};
    if (marque) filter.marque = marque;
    if (categorie) filter.categorie = categorie;
    if (minPlaces) filter.places = {$gte: minPlaces};
    if (maxPlaces) filter.places = {$lte: maxPlaces};

    const modeles = await Modele.find(filter).populate("marque");
    res.status(200).json({modeles});
};
const getModele = async (req, res) => {
    const modele = await Modele.findById(req.params.id)
        .populate("marque")
        .populate("categorie");
    if (!modele) {
        return res.status(404).json({message: "Modele not found"});
    }
    res.status(200).json({modele});
};
const addModele = async (req, res) => {
    const marque = await Marque.findById(req.body.marque);
    if (!marque) {
        return res.status(404).json({message: "Marque not found"});
    }
    const modele = await Modele.create(req.body);
    res.status(201).json(modele);
};
const updateModele = async (req, res) => {
    const marque = await Marque.findById(req.body.marque);
    if (!marque) {
        return res.status(404).json({message: "Marque not found"});
    }
    const {id: _id} = req.query;
    const modele = await Modele.findByIdAndUpdate(_id, req.body);
    if (!modele) {
        return res.status(404).json({message: "Modele not found"});
    }
    modele.populate("marque");
    res.status(200).json({message: "Modele updated", modele});
};
const deleteModele = async (req, res) => {
    const {id: _id} = req.params;
    const modele = await Modele.findByIdAndDelete(_id);
    if (!modele) {
        return res.status(404).json({message: "Modele not found"});
    }
    res.status(200).json({message: "Modele deleted"});
};

module.exports = {
    getAllModele,
    getModele,
    addModele,
    updateModele,
    deleteModele,
};
