const {Reparation} = require("../../models/Vehicule");

const getAllReparation = async (req, res) => {
    const filters = {};
    if (req.query.dateDebut) {
        filters.dateDebut = {$gte: new Date(req.query.dateDebut)};
    }
    if (req.query.etat) {
        filters.etat = req.query.etat;
    }
    const reparations = await Reparation.find(filters)
        .populate({
            path: "vehicule",
            populate: {
                path: "modele",
                populate: {
                    path: "marque",
                    populate: {
                        path: "maison",
                    },
                },
            },
        })
        .populate({
            path: "vehicule",
            populate: {
                path: "modele",
                populate: {
                    path: "categorie",
                },
            },
        })
        .populate("CreatedBy");
    res.status(200).json({reparations});
};

const getReparation = async (req, res) => {
    const reparation = await Reparation.findById(req.params.id).populate(
        "vehicule"
    );
    res.status(200).json({reparation});
};

const addReparation = async (req, res) => {
    const reparation = await Reparation.create(req.body);
    res.status(201).json({reparation});
};

const updateReparation = async (req, res) => {
    const {id: _id} = req.params;
    const reparation = await Reparation.findByIdAndUpdate(_id, req.body);
    if (!reparation) {
        return res.status(404).json({message: "Reparation not found"});
    }

    res.status(200).json({message: "Reparation updated", reparation});
};

const deleteReparation = async (req, res) => {
    const {id: _id} = req.params;
    const reparation = await Reparation.findByIdAndDelete(_id);
    if (!reparation) {
        return res.status(404).json({message: "Reparation not found"});
    }
    res.status(200).json({message: "Reparation deleted"});
};

module.exports = {
    getAllReparation,
    getReparation,
    addReparation,
    updateReparation,
    deleteReparation,
};
