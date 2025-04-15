import mealController from "@/database/controllers/MealController";

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://mealtracker-eta.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const meal = await mealController.getMealById(id);
    if (!meal) {
      return new Response(JSON.stringify({ success: false, message: "Refeição não encontrada." }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return Response.json({ success: true, data: meal });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;

  try {
    const body = await req.json();
    const updatedMeal = await mealController.updateMeal(id, body);
    if (!updatedMeal) {
      return new Response(JSON.stringify({ success: false, message: "Refeição não encontrada." }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return Response.json({ success: true, data: updatedMeal });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const deletedMeal = await mealController.deleteMeal(id);
    if (!deletedMeal) {
      return new Response(JSON.stringify({ success: false, message: "Refeição não encontrada." }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return Response.json({ success: true, message: "Refeição excluída com sucesso." });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}