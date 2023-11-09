const { Schema, models, model } = require("mongoose");

const RecipeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

module.exports = Recipe;
