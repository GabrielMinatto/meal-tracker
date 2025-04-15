import mealController from "@/database/controllers/MealController";

export async function GET() {
  try {
    const meals = await mealController.getMeals();
    return new Response(JSON.stringify({ success: true, data: meals }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await mealController.saveMeal(body);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
