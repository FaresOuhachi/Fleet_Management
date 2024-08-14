const {Carte, Consomation} = require("../../models/Carburant");
const {Vehicule} = require("../../models/Vehicule");
//const{Employe,Chaufeur}=require("../models/Employe");
const {create} = require("../../models/User");
const getAllcartes = async (req, res) => {
    const {numeroCarte, dateFin, etatCarte, sort, feilds} = req.query;
    queryObject = {};
    if (numeroCarte) {
        queryObject.numeroCarte = numeroCarte;
    }
    if (etatCarte) {
        queryObject.etatCarte = etatCarte;
    }
    let result = Carte.find(queryObject);
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("numeroCarte");
    }
    if (dateFin) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq",
            "!=": "$ne",
        };
        const regEx = /\b(<|>|<=|>=|=|!=)\b/g;
        let filters = dateFin.replace(regEx, (match) => `-${operatorMap[match]}-`);
        filters = filters.split(",");
        filters.forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (field === "dateFin") {
                queryObject[field] = {[operatorMap[operator]]: new Date(value)};
            }
        });
    }
    if (feilds) {
        const feildsList = feilds.split(",").join(" ");
        result = result.select(feildsList);
    }

    const cartes = await result;
    res.status(200).json({cartes});
};
const getAllcarte = async (req, res) => {
    const cartes = await Carte.find(req.body);
    res.status(200).json({cartes});
};

const getCarte = async (req, res) => {
    const {id: _id} = req.params;
    const carte = await Carte.findById(_id);
    if (!carte) {
        return res.status(404).json({message: "carte not found"});
    }
    res.status(200).json({carte});
};
const addCarte = async (req, res) => {
    const carte = await Carte.create(req.body);
    res.status(201).json(carte);
};
const updateCarte = async (req, res) => {
    const {id: _id} = req.params;
    const carte = await Carte.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(201).json(carte);
};

const deleteCarte = async (req, res) => {
    const {id: _id} = req.params;
    const carte = await Carte.findByIdAndDelete(_id);
    if (!carte) {
        return res.status(404).json({message: "carte not found"});
    }
    res.status(200).json({carte});
};
const getAllconsomations = async (req, res) => {
    const {carte, numericfilters, date, vehicule, chauffeur, sort, feilds} =
        req.query;
    queryObject = {};
    if (carte) {
        queryObject.carte = carte;
    }
    if (vehicule) {
        queryObject.vehicule = vehicule;
    }
    if (chauffeur) {
        queryObject.chauffeur = chauffeur;
    }
    if (numericfilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq",
            "!=": "$ne",
        };
        const regEx = /\b(<|>|<=|>=|=|!=)\b/g;
        let filters = numericfilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ["cout", "quantite"];
        filters = filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }
            console.log(queryObject);
        });
    }
    if (date) {
        if (date) {
            const operatorMap = {
                ">": "$gt",
                ">=": "$gte",
                "<": "$lt",
                "<=": "$lte",
                "=": "$eq",
                "!=": "$ne",
            };
            const regEx = /\b(<|>|<=|>=|=|!=)\b/g;
            let filters = date.replace(regEx, (match) => `-${operatorMap[match]}-`);
            filters = filters.split(",");
            filters.forEach((item) => {
                const [field, operator, value] = item.split("-");
                if (field === "date") {
                    queryObject[field] = {[operatorMap[operator]]: new Date(value)};
                }
            });
        }
    }
    let result = Consomation.find(queryObject)
        .populate("carte")
        .populate("vehicule")
        .populate("chauffeur");
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("date");
    }

    if (feilds) {
        const feildsList = feilds.split(",").join(" ");
        result = result.select(feildsList);
    }
    const consomations = await result;
    res.status(200).json({consomations});
};
const getConsomation = async (req, res) => {
    const {id: _id} = req.params;
    const consomation = await Consomation.findById(_id);
    if (!consomation) {
        return res.status(404).json({message: "consomation not found"});
    }
    res.status(200).json({consomation});
};
const addConsomation = async (req, res) => {
    const consomation = await Consomation.create(req.body);
    res.status(201).json(consomation);
};
const updateConsomation = async (req, res) => {
    const {id: _id} = req.params;

    const consomation = await Consomation.findByIdAndUpdate(
        req.params.id,
        consomation,
        {new: true}
    );
    res.status(201).json(consomation);
};
const deleteConsomation = async (req, res) => {
    const {id: _id} = req.params;
    const carte = await Carte.findByIdAndDelete(_id);
    if (!carte) {
        return res.status(404).json({message: "carte not found"});
    }
};

module.exports = {
    getAllcartes,
    addCarte,
    getAllcartes,
    getCarte,
    updateCarte,
    deleteCarte,
    addConsomation,
    getAllconsomations,
    getConsomation,
    updateConsomation,
    deleteConsomation,
};
