const {Employe, Permis, Chaufeur} = require("../models/Employe");

const getAllemployes = async (req, res) => {
    const {
        nom,
        prenom,
        sort,
        feilds,
        email,
        telephone,
        matricule,
        dateNaissanceFilters,
    } = req.query;
    queryObject = {};
    //if(dateNAISSANCE){
    // queryObject.dateNAISSANCE=dateNAISSANCE
    //}
    if (nom) {
        queryObject.nom = nom;
    }
    if (prenom) {
        queryObject.prenom = prenom;
    }
    if (email) {
        queryObject.email = email;
    }
    if (telephone) {
        queryObject.telephone = telephone;
    }
    if (matricule) {
        queryObject.matricule = matricule;
    }
    if (dateNaissanceFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };
        const regEx = /\b(<|>|>=|=|<=)\b/g;
        let filters = dateNaissanceFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        console.log("filters:", filters);
        const options = ["dateNaissance"];
        filters.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                queryObject[field] = {[operatorMap[operator]]: value};
            }
            console.log("queryObject:", queryObject);
        });
    }

    let result = Employe.find(queryObject);
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("nom");
    }
    if (feilds) {
        const feildsList = feilds.split(",").join(" ");
        result = result.select(feildsList);
    }
    result = result.populate("CreatedBy");

    const employes = await result;
    res.status(200).json({employes});
};
const getEmploye = async (req, res) => {
    const {id: _id} = req.params;
    const employe = await Employe.findById(_id);
    if (!employe) {
        return res.status(404).json({message: "Employe not found"});
    }
    res.status(200).json({employe});
};
const addEmploye = async (req, res) => {
    const employe = await Employe.create(req.body);
    res.status(201).json(employe);
};
const updateEmploye = async (req, res) => {
    const {id: _id} = req.params;

    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(201).json(req.body);
};
const deleteEmploye = async (req, res) => {
    const {id: _id} = req.params;
    const employe = await Employe.findByIdAndDelete(_id);
    if (!employe) {
        return res.status(404).json({message: "employe not found"});
    }
    res.status(200).json({employe});
};

const getAllchauffeurs = async (req, res) => {
    const {
        nom,
        prenom,
        sort,
        feilds,
        email,
        telephone,
        matricule,
        dateNaissanceFilters,
        permis,
        etatChaufeur,
    } = req.query;
    queryObject = {};

    if (nom) {
        queryObject.nom = nom;
    }
    if (prenom) {
        queryObject.prenom = prenom;
    }
    if (email) {
        queryObject.email = email;
    }
    if (telephone) {
        queryObject.telephone = telephone;
    }
    if (matricule) {
        queryObject.matricule = matricule;
    }
    if (permis) {
        queryObject.permis = permis;
    }
    if (etatChaufeur) {
        queryObject.etatChaufeur = etatChaufeur;
    }
    let result = Chaufeur.find(queryObject).populate("permis");
    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("nom");
    }
    if (feilds) {
        const feildsList = feilds.split(",").join(" ");
        result = result.select(feildsList);
    }

    const chauffeurs = await Chaufeur.find(queryObject).populate({
        path: "permis",
        populate: {
            path: "categorie",
        },
    });
    res.status(200).json({chauffeurs});
};
const getChauffeur = async (req, res) => {
    const {id: _id} = req.params;
    const chaufeur = await Chaufeur.findById(_id, req.body, {
        new: true,
    }).populate({
        path: "permis",
        populate: {
            path: "categorie",
        },
    });
    if (!chaufeur) {
        return res.status(404).json({message: "chauffeur not found"});
    }
    res.status(200).json({chaufeur});
};
const addChauffeur = async (req, res) => {
    const chaufeur = await Chaufeur.create(req.body);
    const employeId = chaufeur._id; // Récupérer l'ID de l'employé ajouté en tant que chauffeur
    const updatedEmploye = await Employe.findByIdAndUpdate(
        employeId,
        {role: "chauffeur"}, // Mettre à jour le rôle de l'employé en "chauffeur"
        {new: true}
    );

    res.status(201).json({message: "Chauffeur ajouté avec succès !", chaufeur});
};

const deleteChauffeur = async (req, res) => {
    const {id: _id} = req.params;

    try {
        const chauffeur = await Chaufeur.findByIdAndDelete(_id).populate("permis");

        if (!chauffeur) {
            return res.status(404).json({message: "chauffeur not found"});
        }

        if (chauffeur.permis) {
            await Permis.findByIdAndDelete(chauffeur.permis._id);
        }

        res.status(200).json({chauffeur});
    } catch (error) {
        console.error("Error deleting chauffeur:", error);
        res.status(500).json({message: "Error deleting chauffeur"});
    }
};

const updateChauffeur = async (req, res) => {
    const {id: _id} = req.params;
    const {permis, ...updatedChauffeurData} = req.body;

    try {
        const updatedChauffeur = await Chaufeur.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedChauffeurData},
            {new: true}
        ).populate("permis");

        if (permis) {
            const updatedPermis = await Permis.findByIdAndUpdate(permis._id, permis, {
                new: true,
            });

            updatedChauffeur.permis = updatedPermis;
        }

        res.status(201).json(updatedChauffeur);
    } catch (error) {
        res.status(500).json({error: "Failed to update chauffeur"});
    }
};

const addPermis = async (req, res) => {
    const permis = await Permis.create(req.body);
    res.status(201).json(permis);
};

const getAllpermis = async (req, res) => {
    const {numero, finValidite, categorie, sort, fields} = req.query;
    queryObject = {};
    if (numero) {
        queryObject.numero = numero;
    }
    if (categorie) {
        queryObject.categorie = categorie;
    }
    if (finValidite) {
        queryObject.finValidite = finValidite;
    }
    const permis = await Permis.find(queryObject)
        .populate("categorie") // Nom du champ de référence à la catégorie dans le modèle Permis
        .sort(sort)
        .select(fields);
    res.status(200).json({permis});
};
const getPermis = async (req, res) => {
    const {id: _id} = req.params;
    const permis = await Permis.findById(_id)
        .populate("categorie") // Nom du champ de référence à la catégorie dans le modèle Permis
        .exec();
    if (!permis) {
        return res.status(404).json({message: "Permis not found"});
    }
    res.status(200).json({permis});
};

const updatePermis = async (req, res) => {
    const permis = await Permis.findByIdAndUpdate(req.params.id, permis, {
        new: true,
    });
    res.status(201).json(permis);
};
const deletePermis = async (req, res) => {
    const {id: _id} = req.params;
    const permis = await Permis.findByIdAndDelete(_id);
    if (!permis) {
        return res.status(404).json({message: "permis not found"});
    }
    res.status(200).json({permis});
};

const getAllUsers = async (req, res) => {
    const users = await Employe.find({__t: "User"});
    res.status(200).json({users});
};

module.exports = {
    getAllUsers,
    addPermis,
    updateChauffeur,
    getAllemployes,
    getEmploye,
    addEmploye,
    updateEmploye,
    deleteEmploye,
    getAllchauffeurs,
    getChauffeur,
    addChauffeur,
    deleteChauffeur,
    updatePermis,
    getAllpermis,
    getPermis,
    deletePermis,
};
