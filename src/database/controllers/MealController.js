import Meal from "../schemas/MealSchema";
import database from "../database";


// CRUD
// CREATE
export const saveMeal = async (queryMeal) => {
    const dataBaseConnection = database.connect();
    if (!dataBaseConnection) return false;

    const newMeal = new Meal(queryMeal);
    const saved = await newMeal.save();
    return saved;
}
// READ
export const getMeals = async (filter = {}) => {
    const dataBaseConnection = database.connect();
    if (!dataBaseConnection) return false;

    const meals = await Meal.find(filter);
    return meals;
};

export const getMealById = async (id) => {
    const dataBaseConnection = database.connect();
    if (!dataBaseConnection) return false;

    const meal = await Meal.findById(id);
    return meal;
};

// UPDATE
export const updateMeal = async (id, updateData) => {
    const dataBaseConnection = database.connect();
    if (!dataBaseConnection) return false;

    const updatedMeal = await Meal.findByIdAndUpdate(id, updateData, { new: true });
    return updatedMeal;
};

// DELETE
export const deleteMeal = async (id) => {
    const dataBaseConnection = database.connect();
    if (!dataBaseConnection) return false;

    const deletedMeal = await Meal.findByIdAndDelete(id);
    return deletedMeal;
};

const mealController = {
    saveMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal
};

export default mealController;