const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

//jwt string can be any long
const JWT_SECRET = "Harryisagoodboy";

//Route 1: create user using: POST "/api/auth/createuser". Doesn't required auth
router.post(
  "/createuser",
  [
    body("email", "Enter A Valid Email").isEmail(),
    body("name", "Enter A Valid Name").isLength({ min: 3 }),
    body("password", "Password Must Be More Than 4").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //IF errors are found, returns bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check if the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry User Email already Existed" });
      }
      // bycryptjs secured password hassed
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      //jsonwebtoken used for safety of user data
      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);

      //   res.json({ user });
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2: Authenticate user using: POST "/api/auth/login". Doesn't required auth
router.post(
  "/login",
  [
    body("email", "Enter A Valid Email").isLength({ min: 3 }),
    body("password", "Password cannot be blanked").exists(),
  ],
  async (req, res) => {
    //IF errors are found, returns bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Email or Password Incorrect" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Email or Password Incorrect" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Get Login IN  user details: Get "/api/auth/getuser" ----Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findOne({ _id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
