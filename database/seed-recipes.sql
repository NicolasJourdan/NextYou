-- Insertion de recettes d'exemple
USE nextyou;

INSERT INTO recipes (id, title, description, ingredients, steps, nutrition, prepTime, cookTime, servings, difficulty, is_favorite) VALUES
(
    'rec-001',
    'Salade Quinoa aux Légumes',
    'Une salade fraîche et nutritive parfaite pour l\'été',
    JSON_ARRAY(
        JSON_OBJECT('name', 'Quinoa', 'quantity', 100, 'unit', 'g'),
        JSON_OBJECT('name', 'Tomates cerises', 'quantity', 200, 'unit', 'g'),
        JSON_OBJECT('name', 'Concombre', 'quantity', 1, 'unit', 'unité'),
        JSON_OBJECT('name', 'Avocat', 'quantity', 1, 'unit', 'unité'),
        JSON_OBJECT('name', 'Huile d\'olive', 'quantity', 30, 'unit', 'ml'),
        JSON_OBJECT('name', 'Jus de citron', 'quantity', 15, 'unit', 'ml'),
        JSON_OBJECT('name', 'Sel', 'quantity', 5, 'unit', 'g'),
        JSON_OBJECT('name', 'Poivre', 'quantity', 2, 'unit', 'g')
    ),
    JSON_ARRAY(
        'Rincer le quinoa à l\'eau froide',
        'Faire cuire le quinoa dans 200ml d\'eau bouillante pendant 15 minutes',
        'Laisser refroidir le quinoa',
        'Couper les tomates en deux',
        'Éplucher et couper le concombre en dés',
        'Couper l\'avocat en morceaux',
        'Mélanger tous les ingrédients dans un saladier',
        'Assaisonner avec l\'huile d\'olive, le citron, le sel et le poivre'
    ),
    JSON_OBJECT(
        'calories', 320,
        'proteins', 12,
        'carbs', 45,
        'fats', 15,
        'fiber', 8
    ),
    10, 15, 2, 2, false
),
(
    'rec-002',
    'Poulet Grillé aux Herbes',
    'Filet de poulet grillé avec des herbes fraîches',
    JSON_ARRAY(
        JSON_OBJECT('name', 'Filet de poulet', 'quantity', 300, 'unit', 'g'),
        JSON_OBJECT('name', 'Thym frais', 'quantity', 10, 'unit', 'g'),
        JSON_OBJECT('name', 'Romarin', 'quantity', 5, 'unit', 'g'),
        JSON_OBJECT('name', 'Huile d\'olive', 'quantity', 20, 'unit', 'ml'),
        JSON_OBJECT('name', 'Ail', 'quantity', 2, 'unit', 'gousses'),
        JSON_OBJECT('name', 'Sel', 'quantity', 5, 'unit', 'g'),
        JSON_OBJECT('name', 'Poivre', 'quantity', 3, 'unit', 'g')
    ),
    JSON_ARRAY(
        'Préchauffer le four à 200°C',
        'Hacher finement l\'ail et les herbes',
        'Mélanger l\'huile d\'olive avec l\'ail et les herbes',
        'Badigeonner les filets de poulet avec le mélange',
        'Saler et poivrer',
        'Faire griller 8-10 minutes de chaque côté',
        'Laisser reposer 5 minutes avant de servir'
    ),
    JSON_OBJECT(
        'calories', 280,
        'proteins', 35,
        'carbs', 2,
        'fats', 15,
        'fiber', 1
    ),
    15, 20, 2, 2, false
),
(
    'rec-003',
    'Smoothie Bowl Acai',
    'Bowl coloré et nutritif parfait pour le petit-déjeuner',
    JSON_ARRAY(
        JSON_OBJECT('name', 'Pulpe d\'açaí', 'quantity', 100, 'unit', 'g'),
        JSON_OBJECT('name', 'Banane', 'quantity', 1, 'unit', 'unité'),
        JSON_OBJECT('name', 'Myrtilles', 'quantity', 50, 'unit', 'g'),
        JSON_OBJECT('name', 'Granola', 'quantity', 30, 'unit', 'g'),
        JSON_OBJECT('name', 'Noix de coco râpée', 'quantity', 15, 'unit', 'g'),
        JSON_OBJECT('name', 'Miel', 'quantity', 10, 'unit', 'ml')
    ),
    JSON_ARRAY(
        'Mixer la pulpe d\'açaí avec la banane',
        'Verser dans un bol',
        'Décorer avec les myrtilles',
        'Ajouter le granola',
        'Parsemer de noix de coco râpée',
        'Arroser de miel'
    ),
    JSON_OBJECT(
        'calories', 250,
        'proteins', 6,
        'carbs', 45,
        'fats', 8,
        'fiber', 7
    ),
    10, 0, 1, 1, false
),
(
    'rec-004',
    'Pasta Carbonara',
    'Classique italien crémeux et savoureux',
    JSON_ARRAY(
        JSON_OBJECT('name', 'Spaghetti', 'quantity', 200, 'unit', 'g'),
        JSON_OBJECT('name', 'Lardons', 'quantity', 100, 'unit', 'g'),
        JSON_OBJECT('name', 'Œufs', 'quantity', 2, 'unit', 'unité'),
        JSON_OBJECT('name', 'Parmesan râpé', 'quantity', 50, 'unit', 'g'),
        JSON_OBJECT('name', 'Poivre noir', 'quantity', 5, 'unit', 'g'),
        JSON_OBJECT('name', 'Sel', 'quantity', 5, 'unit', 'g')
    ),
    JSON_ARRAY(
        'Faire cuire les pâtes dans l\'eau salée',
        'Faire revenir les lardons à la poêle',
        'Battre les œufs avec le parmesan',
        'Égoutter les pâtes en gardant un peu d\'eau',
        'Mélanger les pâtes avec les lardons',
        'Hors du feu, ajouter le mélange œufs-parmesan',
        'Remuer rapidement pour créer la sauce crémeuse',
        'Poivrer généreusement'
    ),
    JSON_OBJECT(
        'calories', 450,
        'proteins', 20,
        'carbs', 60,
        'fats', 18,
        'fiber', 3
    ),
    10, 15, 2, 3, false
),
(
    'rec-005',
    'Buddha Bowl Végétarien',
    'Assiette équilibrée avec légumes, céréales et protéines',
    JSON_ARRAY(
        JSON_OBJECT('name', 'Riz complet', 'quantity', 100, 'unit', 'g'),
        JSON_OBJECT('name', 'Pois chiches', 'quantity', 150, 'unit', 'g'),
        JSON_OBJECT('name', 'Brocoli', 'quantity', 200, 'unit', 'g'),
        JSON_OBJECT('name', 'Carottes', 'quantity', 2, 'unit', 'unité'),
        JSON_OBJECT('name', 'Avocat', 'quantity', 1, 'unit', 'unité'),
        JSON_OBJECT('name', 'Graines de sésame', 'quantity', 10, 'unit', 'g'),
        JSON_OBJECT('name', 'Sauce soja', 'quantity', 15, 'unit', 'ml'),
        JSON_OBJECT('name', 'Huile de sésame', 'quantity', 10, 'unit', 'ml')
    ),
    JSON_ARRAY(
        'Faire cuire le riz complet',
        'Faire cuire les pois chiches',
        'Faire cuire le brocoli à la vapeur',
        'Râper les carottes',
        'Couper l\'avocat en tranches',
        'Disposer tous les ingrédients dans un bol',
        'Arroser de sauce soja et d\'huile de sésame',
        'Parsemer de graines de sésame'
    ),
    JSON_OBJECT(
        'calories', 380,
        'proteins', 15,
        'carbs', 55,
        'fats', 12,
        'fiber', 12
    ),
    20, 25, 2, 2, false
); 