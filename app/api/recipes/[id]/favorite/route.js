import { NextResponse } from 'next/server';
import { initDatabase, recipeQueries } from '../../../../../lib/database';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    
    // Initialiser la base de données
    await initDatabase();
    
    // Récupérer la recette actuelle
    const recipes = await recipeQueries.getById(id);
    
    if (recipes.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Recette non trouvée'
      }, { status: 404 });
    }
    
    const recipe = recipes[0];
    const currentFavorite = recipe.is_favorite;
    
    // Basculer le statut favori
    await recipeQueries.toggleFavorite(id, !currentFavorite);
    
    return NextResponse.json({
      success: true,
      message: currentFavorite ? 'Recette retirée des favoris' : 'Recette ajoutée aux favoris',
      isFavorite: !currentFavorite
    });
    
  } catch (error) {
    console.error('Erreur lors de la gestion des favoris:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la gestion des favoris',
      error: error.message
    }, { status: 500 });
  }
} 