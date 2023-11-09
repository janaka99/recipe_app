const router = require("express").Router();
const { isLoggedIn } = require("../middleware/middleware");
const User = require("../models/user");
const { validateUser, validateUserLogin } = require("../utils/validations");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//token generate function
function generateAccessToken(email, username) {
  return jwt.sign(
    {
      email: email,
      username: username,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  );
}

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // validate user
    const user = await validateUser(email, username, password);
    if (user) {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        res.status(400).json({ message: "User Already Exists" });
      } else {
        const salt = await bcrypt.genSalt(9);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        const newUser = new User({
          username: user.username,
          email: user.email,
          password: hashedPassword,
        });
        await newUser.save();
        let token = generateAccessToken(newUser.email, newUser.username);

        res.status(200).json({
          message: "Success",
          token: token,
          user: {
            username: newUser.username,
            email: newUser.email,
          },
        });
      }
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "Something went wrong", error2: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await validateUserLogin(email, password);
    if (user) {
      const foundUser = await User.findOne({ email: user.email });

      if (!foundUser) {
        res.status(401).json({ message: "Email or password incorrect" });
      } else {
        //hashed password compare
        const hashedPassword = await bcrypt.compareSync(
          password,
          foundUser.password
        );
        if (hashedPassword) {
          //Generaet new token
          let token = generateAccessToken(foundUser.email, foundUser.username);

          res.status(200).json({
            message: "Success",
            token: token,
            user: {
              username: foundUser.username,
              email: foundUser.email,
            },
          });
        } else {
          res.status(401).json({ message: "Email or password incorrect" });
        }
      }
    } else {
      res.status(401).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Something went wrong" });
  }
});

router.get("/validate-user", isLoggedIn, async (req, res) => {
  try {
    let token = generateAccessToken(req.user.email, req.user.username);

    res.status(200).json({
      message: "Success",
      token: token,
      user: {
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Something went wrong" });
  }
});

module.exports = router;
