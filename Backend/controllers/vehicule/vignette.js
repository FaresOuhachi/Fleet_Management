const {Vignette} = require("../../models/Vehicule");
const getAllVignette = async (req, res) => {
    const {vehicule, from, to} = req.query;

    let filters = {};
    if (vehicule) filters.vehicule = vehicule;
    if (from && to) {
        filters.delai = {
            $gte: new Date(from),
            $lte: new Date(to),
        };
    }

    const vignettes = await Vignette.find(filters).populate("vehicule");
    res.status(200).json({vignettes});
};

const getVignette = async (req, res) => {
    const vignette = await Vignette.findById(req.params.id).populate("vehicule");
    if (!vignette) {
        return res.status(404).json({message: "Vignette not found"});
    }
    res.status(200).json({vignette});
};

const addVignette = async (req, res) => {
    const vignette = await Vignette.create(req.body);
    res.status(201).json(vignette);
};

const updateVignette = async (req, res) => {
    const {id: _id} = req.query;
    const vignette = await Vignette.findByIdAndUpdate(_id, req.body);
    if (!vignette) {
        return res.status(404).json({message: "Vignette not found"});
    }
    res.status(200).json({message: "Vignette updated", vignette});
};

const deleteVignette = async (req, res) => {
    const {id: _id} = req.params;
    const vignette = await Vignette.findByIdAndDelete(_id);
    if (!vignette) {
        return res.status(404).json({message: "Vignette not found"});
    }
    res.status(200).json({message: "Vignette deleted"});
};

module.exports = {
    getAllVignette,
    getVignette,
    addVignette,
    updateVignette,
    deleteVignette,
};
