const User = require("../models/User");
const utils = require("../lib/utils");

const updateUser = async (req, res, next) => {
    const userId = req.params.id; // Récupérer l'ID de l'utilisateur à partir des paramètres d'URL
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: "Utilisateur introuvable"});
        }

        // Mettre à jour les informations de l'utilisateur
        user.matricule = req.body.matricule;
        user.nom = req.body.nom;
        user.prenom = req.body.prenom;
        user.departement = req.body.departement;
        user.dateNaissance = req.body.dateNaissance;
        user.email = req.body.email;
        user.telephone = req.body.telephone;
        user.job = req.body.job;
        user.role = req.body.role;
        // Mettre à jour d'autres champs si nécessaire

        // Mettre à jour le mot de passe si un nouveau mot de passe est fourni
        if (req.body.newPassword) {
            const isValidPassword = utils.validPassword(
                req.body.oldPassword,
                user.hash,
                user.salt
            );

            if (!isValidPassword) {
                return res.status(401).json({message: "Mot de passe incorrect"});
            }

            const {salt, hash} = utils.genPassword(req.body.newPassword);

            user.salt = salt;
            user.hash = hash;
        }

        // Enregistrer les modifications
        await user.save();

        res.json({message: "Informations utilisateur mises à jour avec succès"});
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour des informations utilisateur :",
            error
        );
        res.status(500).json({
            message:
                "Une erreur s'est produite lors de la mise à jour des informations utilisateur",
        });
    }
};

const deleteUser = async (req, res) => {
    const {id: _id} = req.params;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return res.status(404).json({message: "user not found"});
        }

        res.status(200).json({user});
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({message: "Error deleting user"});
    }
};

module.exports = {
    updateUser,
    deleteUser,
};
