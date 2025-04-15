import mealController from "@/database/controllers/MealController";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const meal = await mealController.getMealById(id);
    if (!meal) {
      return new Response(JSON.stringify({ success: false, message: "Refeição não encontrada." }), {
        status: 404,
      });
    }

    return Response.json({ success: true, data: meal });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
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
      });
    }

    return Response.json({ success: true, data: updatedMeal });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
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
      });
    }

    return Response.json({ success: true, message: "Refeição excluída com sucesso." });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}