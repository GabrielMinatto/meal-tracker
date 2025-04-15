"use client";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaPencilAlt, FaTrash} from 'react-icons/fa';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [editMeal, setEditMeal] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [newMeal, setNewMeal] = useState({
    name: "",
    description: "",
    calories: "",
    type: "",
    date: "",
  });

  useEffect(() => {
    fetchMeals();
  }, []);
  async function fetchMeals() {
    setLoading(true);
    try {
      const res = await fetch(`/api/meals`, { method: "GET" });
      const json = await res.json();
      console.log(json.data);
      setMeals(json.data);
    } catch (error) {
      console.error("Erro ao buscar refeições:", error);
    } finally {
      setLoading(false);
    }
  }

  function totalCaloriesToday() {
    const today = new Date().toISOString().split("T")[0];
    return meals
      .filter((meal) => meal.date?.startsWith(today))
      .reduce((acc, meal) => acc + Number(meal.calories), 0);
  }

  async function deleteMeal(id) {
    if (!confirm("Deseja excluir esta refeição?")) return;
    await fetch(`/api/meals/${id}`, { method: "DELETE" });
    fetchMeals();
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    await fetch(`/api/meals/${editMeal._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editMeal),
    });
    setEditMeal(null);
    fetchMeals();
  }

  async function createMeal(e) {
    e.preventDefault();
    await fetch(`/api/meals`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(newMeal),
    });
    setNewMeal({
      name: "",
      description: "",
      calories: "",
      type: "",
      date: new Date().toISOString().split("T")[0],
    });
    fetchMeals();
  }

  const filteredMeals = filter
    ? meals.filter((meal) => meal.type === filter)
    : meals;

  return (
<div className="container mx-auto px-4 py-8 max-w-4xl">
  <h1 className="text-3xl text-center font-bold mb-12 text-indigo-700">Refeições</h1>
  
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <p className="text-gray-700">Total de Refeições: {meals.length}</p>
      <p className="text-blue-600 font-medium">Você {(totalCaloriesToday() !== 0 ?  `consumiu ${totalCaloriesToday()}` : 'não registrou')} calorias hoje!</p>
      <button
        onClick={() => setShowForm(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
      >
        Adicionar Nova Refeição
      </button>
    </div>
  </div>

  {showForm && (
    <form onSubmit={createMeal} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Nova Refeição</h2>
      <div className="flex-box space-x-4 space-y-4 ">
        <input
          type="text"
          placeholder="Nome"
          value={newMeal.name}
          onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          required
          className="w-auto md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={newMeal.description}
          onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
          required
          className="w-auto md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          placeholder="Calorias"
          value={newMeal.calories}
          onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
          className="w-auto md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          type="date"
          value={newMeal.date}
          onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
          required
          className="w-auto md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          value={newMeal.type}
          onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
          required
          className="w-auto md:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Selecione o tipo</option>
          <option value="Café da manhã">Café da manhã</option>
          <option value="Almoço">Almoço</option>
          <option value="Lanche da tarde">Lanche da tarde</option>
          <option value="Janta">Janta</option>
        </select>
        <div className="flex gap-2">
          <button 
            type="submit"
            className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <FaCheck /> Adicionar
          </button>
          <button 
            type="button" 
            onClick={() => setShowForm(false)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <FaTimes /> Cancelar
          </button>
        </div>
      </div>
    </form>
  )}

  <div className="mb-8 flex flex-wrap items-center gap-2">
    <label className="text-gray-700 mr-2">Filtrar por tipo:</label>
    {['Café da manhã', 'Almoço', 'Lanche da tarde', 'Janta'].map((type) => (
      <button
        key={type}
        onClick={() => setFilter(type)}
        className={
          type === filter 
            ? "bg-indigo-100 hover:bg-indigo-400 text-indigo-800 py-1 px-3 rounded-full text-sm transition-colors" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm transition-colors"
        }
        >
        {type}
      </button>
    ))}
    <button 
      onClick={() => setFilter('')}
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm transition-colors"
    >
      Limpar filtro
    </button>
  </div>

  {loading ? (
    <p className="text-center text-gray-500 py-8">Carregando refeições...</p>
  ) : filteredMeals.length === 0 ? (
    <p className="text-center text-gray-500 py-8">Nenhuma refeição encontrada.</p>
  ) : (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredMeals.map((meal) => (
        <li key={meal._id} className="bg-white rounded-lg shadow-md p-4">
          {editMeal?._id === meal._id ? (
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editMeal.name}
                onChange={(e) => setEditMeal({ ...editMeal, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={editMeal.description}
                onChange={(e) => setEditMeal({ ...editMeal, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                value={editMeal.calories}
                onChange={(e) => setEditMeal({ ...editMeal, calories: Number(e.target.value) })}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                value={editMeal.date}
                onChange={(e) => setEditMeal({ ...editMeal, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm"
                >
                  Salvar
                </button>
                <button 
                  onClick={() => setEditMeal(null)} 
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded-md text-sm"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{meal.name}</h2>
                <span className="bg-gray-100 text-gray-800 py-1 px-3 rounded-full text-sm">
                  {meal.type}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{meal.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">{meal.calories} calorias</span>
                <span className="text-gray-500 text-sm">
                  {new Date(meal.date).toISOString().split("T")[0]}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => setEditMeal(meal)}
                  className="flex items-center gap-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-1 px-3 rounded-md text-sm"
                >
                  <FaPencilAlt size={12}/> Editar
                </button>
                <button 
                  onClick={() => deleteMeal(meal._id)}
                  className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded-md text-sm"
                >
                  <FaTrash size={12}/> Excluir
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )}
</div>
  );
}