const router = require("express").Router();
const { isLoggedIn } = require("../middleware/middleware");
const Recipe = require("../models/recipe");
const User = require("../models/user");
const { validateRecipe } = require("../utils/validations");

// Get all recipes
router.get("/get-all", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate({
      path: "user",
      model: User,
      select: "username email",
    });

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

// Add new recipe
router.post("/add-new", isLoggedIn, async (req, res) => {
  try {
    const { name, ingredients, description } = await req.body;
    const recipe = await validateRecipe(name, description, ingredients);

    if (recipe) {
      const newRecipe = new Recipe({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        user: req.user._id,
      });
      await newRecipe.save();
      const recipes = await Recipe.find().populate({
        path: "user",
        model: User,
        select: "username email",
      });

      res.status(200).json({ message: "Successfull" });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

//  get a recipe by id
router.get("/get-recipe/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const recipe = await Recipe.findOne({ _id: id });
    if (recipe) {
      res.status(200).json({ recipe });
    } else {
      res.status(400).json({ error: "recipe not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

// update existing recipe
router.patch("/update-recipe/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, ingredients, description } = await req.body;
    const recipe = await validateRecipe(name, description, ingredients);
    if (recipe) {
      await Recipe.findOneAndUpdate(
        { _id: id, user: req.user._id },
        {
          name: recipe.name,
          description: recipe.description,
          ingredients: recipe.ingredients,
        }
      );

      res
        .status(200)
        .json({ message: "Recipe updated successfully", recipe: recipe });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Something went wrong", error2: error.message });
  }
});

// Delete existing recipe
router.delete("/delete-recipe/:id", isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;

    await Recipe.findOneAndDelete({ _id: id, user: req.user._id });

    res.status(200).json({ msg: "Successfully Deleted the Recipe" });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
});

module.exports = router;
