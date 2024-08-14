const {Categorie} = require("../../models/Vehicule");
const getAllCategorie = async (req, res) => {
    const categories = await Categorie.find();
    res.status(200).json({categories});
};
const addCategorie = async (req, res) => {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
};
const getCategorie = async (req, res) => {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
        return res.status(404).json({message: "Categorie not found"});
    }
    res.status(200).json({categorie});
};
const updateCategorie = async (req, res) => {
    const {id: _id} = req.query;
    const categorie = await Categorie.findByIdAndUpdate(_id, req.body);
    if (!categorie) {
        return res.status(404).json({message: "Categorie not found"});
    }
    res.status(200).json({message: "Categorie updated", categorie});
};
const deleteCategorie = async (req, res) => {
    const {id: _id} = req.params;
    const categorie = await Categorie.findByIdAndDelete(_id);
    if (!categorie) {
        return res.status(404).json({message: "Categorie not found"});
    }
    res.status(200).json({message: "Categorie deleted"});
};

module.exports = {
    getAllCategorie,
    addCategorie,
    getCategorie,
    updateCategorie,
    deleteCategorie,
};
