'use client';

import { 
  Card, 
  CardBody, 
  CardHeader, 
  Button, 
  Chip, 
  Divider
} from "@heroui/react";

export function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  // Obtenir les étoiles de difficulté
  const getDifficultyStars = (difficulty) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  // Obtenir la couleur du tag selon la catégorie
  const getTagColor = (tag) => {
    if (tag.includes('végétarien') || tag.includes('vegan')) return 'success';
    if (tag.includes('rapide')) return 'primary';
    if (tag.includes('difficile')) return 'danger';
    if (tag.includes('italienne') || tag.includes('française')) return 'secondary';
    return 'default';
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
            onClick={onToggleFavorite}
            className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-white shadow"
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            style={{ lineHeight: 1, fontSize: '1.5rem' }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Button>
        </div>
      </CardHeader>

      <CardBody className="pt-2">
        {/* Métadonnées */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              ⏱️ {recipe.metadata.prepTime + recipe.metadata.cookTime}min (🔪 {recipe.metadata.prepTime}min{recipe.metadata.cookTime > 0 ? `, 🍳 ${recipe.metadata.cookTime}min` : ''})
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              👥 {recipe.metadata.servings} pers.
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {getDifficultyStars(recipe.metadata.difficulty)}
            </span>
            <span className="text-sm font-medium">
              🔥 {recipe.nutrition.calories} cal
            </span>
          </div>
        </div>

        <Divider className="my-3" />

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {recipe.metadata.tags.slice(0, 3).map((tag, index) => (
            <Chip
              key={index}
              size="sm"
              color={getTagColor(tag)}
              variant="flat"
            >
              {tag}
            </Chip>
          ))}
          {recipe.metadata.tags.length > 3 && (
            <Chip size="sm" variant="flat" color="default">
              +{recipe.metadata.tags.length - 3}
            </Chip>
          )}
        </div>

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