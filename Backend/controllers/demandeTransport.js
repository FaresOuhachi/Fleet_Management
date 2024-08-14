const {demandeTransport} = require("../models/demandeTransport");

const getAllDemandesT = async (req, res) => {
    const {
        dateDepartFrom,
        dateDepartTo,
        dateRetourFrom,
        dateRetourTo,
        destination,
        demandeApproved,
    } = req.query;

    const query = demandeTransport
        .find()
        .populate("passagers")
        .populate("approvedBy")
        .populate("demanderPar");

    if (dateDepartFrom && dateDepartTo) {
        query.where("dateDepart").gte(dateDepartFrom).lte(dateDepartTo);
    }

    if (dateRetourFrom && dateRetourTo) {
        query.where("dateRetour").gte(dateRetourFrom).lte(dateRetourTo);
    }

    if (destination) {
        query.where("Destination").equals(destination);
    }

    if (demandeApproved) {
        query.where("demandeApproved").equals(demandeApproved.toLowerCase());
    }

    const DemandeTransport = await query.exec();

    res.status(200).json({DemandeTransport});
};

const getDemandesT = async (req, res) => {
    const DemandeTransport = await demandeTransport
        .findById(req.params.id)
        .populate("passagers")
        .populate("approvedBy")
        .populate("demanderPar");

    res.status(200).json({DemandeTransport});
};

const addDemandesT = async (req, res) => {
    const DemandeTransport = await demandeTransport.create(req.body);
    res
        .status(201)
        .json({message: "Demande de transport created!!", DemandeTransport});
};

const updateDemandesT = async (req, res) => {
    const {id: _id} = req.params;
    console.log(_id, req.params, req.body);
    const DEMANDE = await demandeTransport.findByIdAndUpdate(_id, req.body);
    if (!DEMANDE) {
        return res.status(404).json({message: "Demande not found"});
    }
    res.status(200).json({message: "Demande updated"});
};

const deleteDemandesT = async (req, res) => {
    const {id: _id} = req.params;
    const DemandeTransport = await demandeTransport.findByIdAndDelete(_id);
    if (!DemandeTransport) {
        return res.status(404).json({message: "Demande de transport not found"});
    }
    res.status(200).json({message: "Demande de transport deleted!!"});
};

module.exports = {
    getAllDemandesT,
    getDemandesT,
    addDemandesT,
    updateDemandesT,
    deleteDemandesT,
};
