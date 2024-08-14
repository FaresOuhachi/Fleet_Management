// crud ops for maison
const {Maison} = require("../../models/Vehicule");
const getAllMaison = async (req, res) => {
    let query = {};

    if (req.query.nom) {
        query.nom = {$regex: req.query.nom, $options: "i"};
    }

    if (req.query.adresse) {
        query.adresse = {$regex: req.query.adresse, $options: "i"};
    }

    const maisons = await Maison.find(query);
    res.status(200).json({maisons});
};
const getMaison = async (req, res) => {
    const maison = await Maison.findById(req.params.id);
    if (!maison) {
        return res.status(404).json({message: "Maison not found"});
    }
    res.status(200).json({maison});
};
const addMaison = async (req, res) => {
    const maison = await Maison.create(req.body);
    console.log(maison);
    res.status(201).json({maison});
};
const updateMaison = async (req, res) => {
    const {id: _id} = req.params;
    console.log(_id, req.params, req.body);
    const maison = await Maison.findByIdAndUpdate(_id, req.body);
    if (!maison) {
        return res.status(404).json({message: "Maison not found"});
    }
    res.status(200).json({message: "Maison updated"});
};
const deleteMaison = async (req, res) => {
    const {id: _id} = req.params;
    const maison = await Maison.findByIdAndDelete(_id);
    if (!maison) {
        return res.status(404).json({message: "Maison not found"});
    }
    res.status(200).json({message: "Maison deleted"});
};

module.exports = {
    getAllMaison,
    getMaison,
    addMaison,
    updateMaison,
    deleteMaison,
};
