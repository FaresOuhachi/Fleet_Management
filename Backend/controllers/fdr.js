const {demandeTransport} = require("../models/demandeTransport");
const {feuilleDeRoute} = require("../models/feulleDeRoute");
const {Vehicule} = require("../models/Vehicule");
const mongoose = require("mongoose");
const getAllFDR = async (req, res) => {
    const {fdrApproved, destination, matricule, ddt} = req.query;

    const query = feuilleDeRoute
        .find()
        .populate({
            path: "chauffeur",
            populate: {
                path: "permis",
            },
        })
        .populate([
            {
                path: "ddt",
                populate: {
                    path: "passagers",
                },
            },
            {
                path: "ddt",
                populate: {
                    path: "demanderPar",
                },
            },
            {
                path: "ddt",
                populate: {
                    path: "approvedBy",
                },
            },
        ])
        .populate("approvedBy")
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
        .populate("carte");

    if (fdrApproved) {
        query.where("fdrApproved").equals(fdrApproved.toLowerCase());
    }

    const FeuilleDeRoute = await query.exec();

    if (matricule) {
        // query.where("vehicule.matricule").equals(matricule);
        const matriculeFdr = FeuilleDeRoute.filter(
            (fdr) => fdr.vehicule.matricule === matricule
        );
    }

    if (ddt) {
        const ddtFdr = FeuilleDeRoute.filter((fdr) => fdr.ddt._id === ddt);
    }

    if (destination) {
        const destinationFdr = FeuilleDeRoute.filter(
            (fdr) => fdr.ddt.destination === destination
        );
    }

    res.status(200).json({FeuilleDeRoute});
};

const getFDR = async (req, res) => {
    const FeuilleDeRoute = await feuilleDeRoute
        .findById(req.params.id)
        .populate({
            path: "chauffeur",
            populate: {
                path: "permis",
            },
        })
        .populate([
            {
                path: "ddt",
                populate: {
                    path: "passagers",
                },
            },
            {
                path: "ddt",
                populate: {
                    path: "demanderPar",
                },
            },
            {
                path: "ddt",
                populate: {
                    path: "approvedBy",
                },
            },
        ])
        .populate("approvedBy")
        .populate("vehicule")
        .populate("carte");

    res.status(200).json({FeuilleDeRoute});
};

const addFDR = async (req, res) => {
    const ddtUsedAlready = await feuilleDeRoute.find().select("ddt");
    const ddtId = new mongoose.Types.ObjectId(req.body.ddt);
    if (ddtUsedAlready.some((item) => item.ddt.toString() === ddtId.toString())) {
        return res
            .status(400)
            .json({message: "Demande de transport déjà utilisée"});
    } else {
        const FeuilleDeRoute = await feuilleDeRoute.create(req.body);
        res
            .status(201)
            .json({message: "Feuille de route created!!", FeuilleDeRoute});
    }
};

// const updateFDR = async (req, res) => {
//   const { id: _id } = req.params;
//   const FeuilleDeRoute = await feuilleDeRoute.findOneAndUpdate(_id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!FeuilleDeRoute) {
//     return res.status(404).json({ message: "Feuille de route not found" });
//   }
// };

const updateFDR = async (req, res) => {
    const {id: _id} = req.params;
    const {kilometrageRetour, ddt, ...updatedfdr} = req.body;

    try {
        const FeuilleDeRoute = await feuilleDeRoute
            .findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
            .populate("ddt");

        if (ddt) {
            const updatedddt = await demandeTransport.findByIdAndUpdate(
                ddt._id,
                ddt,
                {
                    new: true,
                }
            );

            FeuilleDeRoute.ddt = updatedddt;
        }

        if (!FeuilleDeRoute) {
            return res.status(404).json({message: "Feuille de route not found"});
        }

        // Update the 'kilometrage' attribute in Vehicule document
        const vehicule = await Vehicule.findByIdAndUpdate(
            FeuilleDeRoute.vehicule,
            {$set: {kilometrage: kilometrageRetour}},
            {new: true, runValidators: true}
        );

        if (!vehicule) {
            return res
                .status(404)
                .json({message: "Vehicule for the Feuille de route not found"});
        }

        return res.json({FeuilleDeRoute, vehicule});
    } catch (error) {
        return res.status(500).json({message: "Error updating FDR", error});
    }
};

const deleteFDR = async (req, res) => {
    const {id: _id} = req.params;
    const FeuilleDeRoute = await feuilleDeRoute.findByIdAndDelete(_id);
    if (!FeuilleDeRoute) {
        return res.status(404).json({message: "Feuille de route not found"});
    }
    res
        .status(200)
        .json({message: "Feuille de route deleted!!", FeuilleDeRoute});
};

module.exports = {
    getAllFDR,
    getFDR,
    addFDR,
    updateFDR,
    deleteFDR,
};
