'use client';

import { useState } from 'react';
import { Input, Select, SelectItem } from "@heroui/react";

export function SearchFilters({ onSearchChange, onFilterChange, onPrepTimeChange, recipeCount = 0 }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPrepTime, setSelectedPrepTime] = useState('all');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  const handlePrepTimeChange = (value) => {
    setSelectedPrepTime(value);
    onPrepTimeChange?.(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Recherche */}
        <Input
          placeholder="Rechercher une recette..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          startContent={<span className="text-gray-400">🔍</span>}
          className="w-full"
        />

        {/* Filtres */}
        <Select
          placeholder="Filtrer par..."
          value={selectedFilter}
          onChange={(e) => handleFilterChange(e.target.value)}
          startContent={<span className="text-gray-400">⚙️</span>}
        >
          <SelectItem key="all" value="all">Toutes les recettes</SelectItem>
          <SelectItem key="favorites" value="favorites">Mes favoris</SelectItem>
          <SelectItem key="quick" value="quick">Rapides (&lt; 15min)</SelectItem>
          <SelectItem key="vegetarian" value="vegetarian">Végétariennes</SelectItem>
        </Select>

        <Select
          placeholder="Filtrer par temps de préparation..."
          value={selectedPrepTime}
          onChange={(e) => handlePrepTimeChange(e.target.value)}
          startContent={<span className="text-gray-400">⏱️</span>}
        >
          <SelectItem key="all" value="all">Toutes les recettes</SelectItem>
          <SelectItem key="quick" value="quick">Rapides (&lt; 15min)</SelectItem>
          <SelectItem key="medium" value="medium">Moyennes (15-30min)</SelectItem>
          <SelectItem key="long" value="long">Longues (&gt; 30min)</SelectItem>
        </Select>
      </div>
      {/* Nombre de recettes centré avec emoji livre */}
      <div className="w-full text-center mt-4">
        <span className="text-base text-gray-700 dark:text-gray-200 font-medium">
          {recipeCount} recette{recipeCount > 1 ? 's' : ''} 📖
        </span>
      </div>
    </div>
  );
}
