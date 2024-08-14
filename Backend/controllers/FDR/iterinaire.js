const {Iterinaire} = require("../../models/FDR");

const getAllIterinaire = async (req, res) => {
    const {depart, arrivee} = req.query;
    const filters = {};
    if (depart) filters.depart = depart;
    if (arrivee) filters.arrivee = arrivee;
    const iterinaires = await Iterinaire.find(filters);
    res.status(200).json({iterinaires});
};

const getIterinaire = async (req, res) => {
    const iterinaire = await Iterinaire.findById(req.params.id);
    res.status(200).json({iterinaire});
};

const addIterinaire = async (req, res) => {
    const iterinaire = await Iterinaire.create(req.body);
    res.status(201).json({iterinaire});
};

const updateIterinaire = async (req, res) => {
    const {id: _id} = req.query;
    const iterinaire = await Iterinaire.findByIdAndUpdate(_id, req.body);
    if (!iterinaire) {
        return res.status(404).json({message: "Iterinaire not found"});
    }
    res.status(200).json({message: "Iterinaire updated", iterinaire});
};

const deleteIterinaire = async (req, res) => {
    const {id: _id} = req.params;
    const iterinaire = await Iterinaire.findByIdAndDelete(_id);
    if (!iterinaire) {
        return res.status(404).json({message: "Iterinaire not found"});
    }
    res.status(200).json({message: "Iterinaire deleted"});
};
