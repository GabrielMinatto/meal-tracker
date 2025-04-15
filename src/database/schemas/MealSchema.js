import { Schema, model, models } from "mongoose";

const MealSchema = Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    calories: {type: String, required: true},
    date: {type: Date, required: true},
    type: {type: String, required: true}
})

const Meal = models.Meal || model("Meal", MealSchema);

export default Meal