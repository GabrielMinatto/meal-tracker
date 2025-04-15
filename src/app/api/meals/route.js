import mealController from "@/database/controllers/MealController";

const corsHeaders = {
  "Access-Control-Allow-Origin": "mealtracker-eta.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const meals = await mealController.getMeals();
    return new Response(JSON.stringify({ success: true, data: meals }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await mealController.saveMeal(body);
    return new Response(JSON.stringify({ success: true, data }), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
