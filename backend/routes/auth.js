const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

// create user using: POST "/api/auth/createuser". Doesn't required auth
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
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occur");
    }
  }
);

module.exports = router;
