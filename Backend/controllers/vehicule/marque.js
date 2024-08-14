// crude ops for marque
const {Marque} = require("../../models/Vehicule");
const getAllMarque = async (req, res) => {
    const filter = {};

    if (req.query.maison) {
        filter.maison = req.query.maison;
    }
    const marques = await Marque.find(filter).populate("maison");
    res.status(200).json({marques});
};

const getMarque = async (req, res) => {
    const marque = await Marque.findById(req.params.id).populate("maison");
    if (!marque) {
        return res.status(404).json({message: "Marque not found"});
    }
    res.status(200).json({marque});
};
const addMarque = async (req, res) => {
    const marque = await Marque.create(req.body);
    res.status(201).json(marque);
};
const updateMarque = async (req, res) => {
    const {id: _id} = req.query;
    const marque = await Marque.findByIdAndUpdate(_id, req.body);
    if (!marque) {
        return res.status(404).json({message: "Marque not found"});
    }
    marque.populate("maison");
    res.status(200).json({message: "Marque updated", marque});
};
const deleteMarque = async (req, res) => {
    const {id: _id} = req.params;
    const marque = await Marque.findByIdAndDelete(_id);
    if (!marque) {
        return res.status(404).json({message: "Marque not found"});
    }
    res.status(200).json({message: "Marque deleted"});
};

module.exports = {
    getAllMarque,
    getMarque,
    addMarque,
    updateMarque,
    deleteMarque,
};
