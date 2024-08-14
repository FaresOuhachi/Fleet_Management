const {Assurance, Vehicule} = require("../../models/Vehicule");

const getAllAssurance = async (req, res) => {
    const {vehicule, minMontant, maxMontant, delai} = req.query;
    const filters = {};
    if (vehicule) filters.vehicule = vehicule;
    if (minMontant) filters.montant = {$gte: minMontant};
    if (maxMontant) {
        if (!filters.montant) filters.montant = {};
        filters.montant.$lte = maxMontant;
    }
    if (delai) filters.delai = {$gte: delai};

    const assurances = await Assurance.find(filters)
        .populate({
            path: "vehicule",
            populate: {
                path: "modele",
                populate: {
                    path: "marque",
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

    res.status(200).json({assurances});
};

const getAssurance = async (req, res) => {
    const assurance = await Assurance.findById(req.params.id).populate(
        "vehicule"
    );
    res.status(200).json({assurance});
};

const addAssurance = async (req, res) => {
    try {
        const assurance = await Assurance.create(req.body);

        // Mettre à jour l'attribut dateassu du véhicule
        const vehicule = await Vehicule.findByIdAndUpdate(
            assurance.vehicule,
            {$set: {dateassu: assurance.delai}},
            {new: true}
        );

        res.status(201).json({assurance, vehicule});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateAssurance = async (req, res) => {
    const {id: _id} = req.params;
    const {delai} = req.body;

    try {
        const assurance = await Assurance.findByIdAndUpdate(_id, req.body, {
            new: true,
        });

        if (!assurance) {
            return res.status(404).json({message: "Assurance not found"});
        }

        if (delai) {
            const vehicule = await Vehicule.findByIdAndUpdate(
                assurance.vehicule,
                {$set: {dateassu: delai}},
                {new: true}
            );

            if (!vehicule) {
                return res.status(404).json({message: "Vehicule not found"});
            }
        }

        res.status(200).json({assurance});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

const deleteAssurance = async (req, res) => {
    const {id: _id} = req.params;
    const assurance = await Assurance.findByIdAndDelete(_id);
    if (!assurance) {
        return res.status(404).json({message: "Assurance not found"});
    }
};

module.exports = {
    getAllAssurance,
    getAssurance,
    addAssurance,
    updateAssurance,
    deleteAssurance,
};
