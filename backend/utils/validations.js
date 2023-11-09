const Joi = require("joi");

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  ingredients: Joi.array().items(
    Joi.string()
      .regex(/^[a-zA-Z0-9\s]+$/)
      .required()
  ),
});

const userSchema = Joi.object({
  email: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateRecipe = async (name, description, ingredients) => {
  try {
    const value = await recipeSchema.validateAsync({
      name,
      description,
      ingredients,
    });
    return value;
  } catch (error) {
    return null;
  }
};
const validateUser = async (email, username, password) => {
  console.log("asds ", email, password, username);
  try {
    const value = await userSchema.validateAsync({
      email,
      username,
      password,
    });
    return value;
  } catch (error) {
    return null;
  }
};

const validateUserLogin = async (email, password) => {
  try {
    const value = await userLoginSchema.validateAsync({
      email,
      password,
    });
    return value;
  } catch (error) {
    return null;
  }
};

module.exports = { validateRecipe, validateUser, validateUserLogin };
