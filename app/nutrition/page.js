import { initDatabase, recipeQueries } from '../../lib/database';
import { RecipeList } from '@/components/nutrition/RecipeList';

export default async function NutritionPage() {
  // Récupération des données côté serveur
  let recipes = [];
  let error = null;

  try {
    await initDatabase();
    const dbRecipes = await recipeQueries.getAll();
    
    // Les données JSON sont déjà parsées par mysql2
    recipes = dbRecipes.map(recipe => ({
      ...recipe,
      tags: recipe.tags ? recipe.tags.split(',').map(tag => tag.trim()) : []
    }));
  } catch (err) {
    console.error('Erreur lors du chargement des recettes:', err);
    error = err.message;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Nutrition & Recettes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez nos recettes saines et équilibrées
          </p>
        </div>
        <RecipeList initialRecipes={recipes} error={error} />
      </div>
    </div>
  );
} 