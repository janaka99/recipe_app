const User = require("../models/user");
var jwt = require("jsonwebtoken");

module.exports.isLoggedIn = (req, res, next) => {
  try {
    // get authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    //verify token
    jwt.verify(
      JSON.parse(token),
      process.env.TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: "Not Authorized" });
        }
        const loggedUser = await User.findOne({ email: user.email });
        if (user) {
          // if user continue the request
          req.user = loggedUser;

          next();
        } else {
          // else terminate the requets
          res.status(401).json({ message: "Not Authorized" });
        }
      }
    );
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
};
