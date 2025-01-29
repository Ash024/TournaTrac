const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Tournament = require("../models/tournamentData");
const Player = require("../models/playerData");
require("../database/connection");
const User = require("../models/userSchema");
const fs = require("fs");

router.get("/signin", (req, res) => {
  res.send(`hello login world from server but router`);
});

//sigup
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the required details" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    console.log(userExist);
    if (userExist) {
      return res.status(422).json({ error: "email already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not matching" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "user registraion succesfully" });
      } else {
        res.status(500).json({ error: "Registraion failed" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "please filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      if (userLogin.password) {
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        if (!isMatch) {
          res.status(400).json({ error: "invalid user" });
        } else {
          const token = jwt.sign(
            {
              email: userLogin.email,
              name: userLogin.name,
              _id: userLogin._id,
              picture: userLogin.picture,
            },
            'bosbsonindbjdbjewjdnciwuuwbksslcskjbkssjbcwowincieeslcbclscnecnekrf'
          );
          res.json({ message: "user signin successfully", user: token });
        }
      }
    } else {
      res.status(400).json({ error: "invalid user" });
    }
  } catch (err) {
    console.log(err);
  }
});

//tournamentdata
router.post("/create", async (req, res) => {
  const {
    tournament_name,
    organiser_name,
    Sports,
    entry_fees,
    email,
    contact,
    start_date,
    state,
    city,
    pincode,
    upiQr,
    upinumber,
    rules,
    imageLink,
  } = req.body;
  if (
    !tournament_name ||
    !organiser_name ||
    !Sports ||
    !entry_fees ||
    !contact ||
    !start_date ||
    !state ||
    !city ||
    !pincode
  ) {
    return res.status(422).json({ error: "please fill the required details" });
  }
  try {
    const tournament = new Tournament({
      tournament_name,
      organiser_name,
      Sports,
      entry_fees,
      email,
      contact,
      start_date,
      state,
      city,
      pincode,
      upiQr,
      upinumber,
      rules,
      image: imageLink,
    });

    const createTournament = await tournament.save();
    if (createTournament) {
      res.status(201).json({ message: "Tournament Created" });
      fs.appendFileSync("Tournament.txt", `${tournament}`);
    } else {
      res.status(500).json({ error: "Try again" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.get("/home", (req, res) => {
  Tournament.find()
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/home/:id", (req, res) => {
  Tournament.findOne({ _id: req.params.id })
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});

// player data
router.put("/player/:id", async (req, res) => {
  const { team_name, captain, contact, payment, player_name } = req.body;
  if (!team_name || !captain || !contact) {
    return res.status(422).json({ error: "please fill the required details" });
  }
  try {
    const player = await Tournament.findById({ _id: req.params.id });

    if (!player) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    const playerDetails = {
      team_name,
      captain,
      contact,
      payment: payment || "Unpaid", 
      player_name: player_name || [],
    };

    player.participents.push(playerDetails);

    console.log(player);
    await player.save();

    res.status(201).json({
      message: "Player added successfully",
      participents: player.participents,
    });
  } catch (err) {
    console.error("Error adding player:", err);
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});

module.exports = router;