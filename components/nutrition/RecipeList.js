'use client';

import { useState, useEffect } from 'react';
import { RecipeCard } from './RecipeCard';
import { SearchFilters } from './SearchFilters';

export function RecipeList({ initialRecipes = [], error = null }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPrepTime, setSelectedPrepTime] = useState('all');

  // Mettre à jour les recettes filtrées quand les données changent
  useEffect(() => {
    setRecipes(initialRecipes);
    setFilteredRecipes(initialRecipes);
  }, [initialRecipes]);

  // Filtrer les recettes
  useEffect(() => {
    const filtered = recipes.filter(recipe => {
      const matchesSearch =
        searchTerm === '' ||
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      ;

      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'favorites' && recipe.is_favorite) ||
        (selectedFilter === 'vegetarian' && recipe.metadata.tags.includes('végétarien'))
      ;

      const matchesPrepTime = 
        selectedPrepTime === 'all' ||
        (selectedPrepTime === 'quick' && recipe.metadata.prepTime < 15) ||
        (selectedPrepTime === 'medium' && recipe.metadata.prepTime >= 15 && recipe.metadata.prepTime < 30) ||
        (selectedPrepTime === 'long' && recipe.metadata.prepTime >= 30)
      ;
      
      return matchesSearch && matchesFilter && matchesPrepTime;
    });
    
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedFilter, selectedPrepTime]);

  // Toggle favori
  const toggleFavorite = async (recipeId) => {
    try {
      const response = await fetch(`/api/recipes/${recipeId}/favorite`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        // Mettre à jour la propriété is_favorite dans le tableau recipes
        setRecipes(prev =>
          prev.map(recipe =>
            recipe.id === recipeId
              ? { ...recipe, is_favorite: !recipe.is_favorite }
              : recipe
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors du toggle favori:', error);
    }
  };

  // Gestionnaires pour les filtres
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handlePrepTimeChange = (value) => {
    if (value === '') {
      setSelectedPrepTime('all');
    } else {
      setSelectedPrepTime(value);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold mb-2">Erreur de chargement</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Impossible de charger les recettes : {error}
        </p>
      </div>
    );
  }

  if (initialRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold mb-2">Aucune recette disponible</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Les recettes n'ont pas encore été ajoutées à la base de données.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Filtres et recherche */}
      <SearchFilters
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        onPrepTimeChange={handlePrepTimeChange}
        recipeCount={filteredRecipes.length}
      />

      {/* Liste des recettes */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={recipe.is_favorite}
            onToggleFavorite={() => toggleFavorite(recipe.id)}
          />
        ))}
      </div>

      {/* Message si aucune recette trouvée */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold mb-2">Aucune recette trouvée</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </>
  );
} 