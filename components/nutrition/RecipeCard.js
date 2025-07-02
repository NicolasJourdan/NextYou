'use client';

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip, 
  Divider,
  Spinner
} from "@heroui/react";
import { useState } from "react";

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  // Obtenir les étoiles de difficulté
  const getDifficultyStars = (difficulty) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  // Obtenir la couleur du tag selon la catégorie
  const getTagColor = (tag) => {
    if (tag.category === 'diet') return 'success';
    if (tag.category === 'cuisine') return 'secondary';
    if (tag.category === 'meal') return 'warning';
    return 'default';
  };

  // Ajout de l'état de chargement
  const [isLoading, setIsLoading] = useState(false);

  // Handler pour le bouton favori
  const handleToggleFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onToggleFavorite();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 relative">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold line-clamp-2">{recipe.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
              {recipe.description}
            </p>
          </div>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={handleToggleFavorite}
            className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-white shadow"
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            style={{ lineHeight: 1, fontSize: '1.5rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="sm" color="default" />
            ) : isFavorite ? '❤️' : '🤍'}
          </Button>
        </div>
      </CardHeader>

      <CardBody className="pt-2">
        {/* Métadonnées */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              ⏱️ {recipe.prepTime + recipe.cookTime}min (🔪 {recipe.prepTime}min{recipe.cookTime > 0 ? `, 🍳 ${recipe.cookTime}min` : ''})
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              👥 {recipe.servings} pers.
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getDifficultyStars(recipe.difficulty)}
            </span>
            <span className="text-sm font-medium">
              🔥 {recipe.nutrition.calories} cal
            </span>
          </div>
        </div>

        <Divider className="my-3" />

        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {recipe.tags.map((tag, index) => {
              return (
                <Chip
                  key={index}
                  size="sm"
                  color={getTagColor(tag)}
                  variant="flat"
                >
                  {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                </Chip>
              )
            })}
          </div>
        )}

        {/* Bouton voir la recette */}
        <Button
          color="primary"
          variant="flat"
          className="w-full"
          href={`/nutrition/recipe/${recipe.id}`}
        >
          Voir la recette
        </Button>
      </CardBody>
    </Card>
  );
} 