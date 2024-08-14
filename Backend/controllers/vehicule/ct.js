const {CT, Vehicule} = require("../../models/Vehicule");

const getAllCT = async (req, res) => {
    const {delaiMin, delaiMax, montantMin, montantMax, ctShop} = req.query;

    let filter = {};
    if (delaiMin || delaiMax) {
        filter.delai = {};
        if (delaiMin) {
            filter.delai.$gte = new Date(delaiMin);
        }
        if (delaiMax) {
            filter.delai.$lte = new Date(delaiMax);
        }
    }
    if (montantMin || montantMax) {
        filter.montant = {};
        if (montantMin) {
            filter.montant.$gte = parseFloat(montantMin);
        }
        if (montantMax) {
            filter.montant.$lte = parseFloat(montantMax);
        }
    }
    if (ctShop) {
        filter.ctShop = ctShop;
    }

    const cts = await CT.find(filter)
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
    res.status(200).json({cts});
};

const getCT = async (req, res) => {
    const ct = await CT.findById(req.params.id).populate("vehicule");
    res.status(200).json({ct});
};

const addCT = async (req, res) => {
    try {
        const ct = await CT.create(req.body);

        // Mettre à jour l'attribut datectrl du véhicule
        const vehicule = await Vehicule.findByIdAndUpdate(
            ct.vehicule,
            {datectrl: ct.delai},
            {new: true}
        );

        res.status(201).json({ct, vehicule});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateCT = async (req, res) => {
    const {id: _id} = req.params;
    const {delai} = req.body;

    try {
        const ct = await CT.findByIdAndUpdate(_id, req.body, {new: true});

        if (!ct) {
            return res.status(404).json({message: "CT not found"});
        }

        if (delai) {
            const vehicule = await Vehicule.findByIdAndUpdate(
                ct.vehicule,
                {$set: {datectrl: delai}},
                {new: true}
            );

            if (!vehicule) {
                return res.status(404).json({message: "Vehicule not found"});
            }
        }

        res.status(200).json({message: "CT updated", ct});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
};

const deleteCT = async (req, res) => {
    const {id: _id} = req.params;
    const ct = await CT.findByIdAndDelete(_id);
    if (!ct) {
        return res.status(404).json({message: "CT not found"});
    }
    res.status(200).json({message: "CT deleted"});
};

module.exports = {
    getAllCT,
    getCT,
    addCT,
    updateCT,
    deleteCT,
};
