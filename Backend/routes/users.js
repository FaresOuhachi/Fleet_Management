const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
const passport = require("passport");
const utils = require("../lib/utils");
const express = require("express");
const { getEmploye, getAllUsers } = require("../controllers/employe");
const { updateUser, deleteUser } = require("../controllers/users");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
  }
);

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {
  User.findOne({ matricule: req.body.matricule })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      if (isValid) {
        const tokenObject = utils.issueJWT(user);
        console.log(tokenObject);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          // role: user.role,
          // username: user.nom + " " + user.prenom,
          // id: user._id,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// Register a new user
router.post("/register", function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const user = req.body;
  user.salt = salt;
  user.hash = hash;

  User.create(user);
  res.status(201).json({ success: true, msg: "Created new user.", user: user });
});

// routes/user.js

// ...

router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

// ...

module.exports = router;

router.get("/:id", getEmploye);

router.get("/", getAllUsers);
module.exports = router;
