const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/conncet_db");
require("dotenv").config();

connectDB();

var corsOptions = {
  origin: "http://127.0.0.1:5173/",
};

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/recipe");

app.use("/api/auth", authRoute);
app.use("/api/recipe", recipeRoute);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
