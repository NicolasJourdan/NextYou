import mysql from 'mysql2/promise';

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'nextyou',
  password: process.env.DB_PASSWORD || 'nextyou123',
  database: process.env.DB_NAME || 'nextyou',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Pool de connexions
let pool = null;

// Initialisation du pool de connexions
export async function initDatabase() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    
    // Test de connexion
    try {
      const connection = await pool.getConnection();
      console.log('✅ Connexion à MySQL établie');
      connection.release();
    } catch (error) {
      console.error('❌ Erreur de connexion à MySQL:', error);
      throw error;
    }
  }
  return pool;
}

// Obtenir une connexion du pool
export async function getConnection() {
  if (!pool) {
    await initDatabase();
  }
  return pool;
}

// Exécuter une requête
export async function query(sql, params = []) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête:', error);
    throw error;
  }
}

// Fermer le pool de connexions
export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('🔌 Connexion à MySQL fermée');
  }
}

// Fonctions utilitaires pour les recettes
export const recipeQueries = {
  // Récupérer toutes les recettes avec tags catégorisés
  getAll: () => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `),

  // Récupérer une recette par ID avec tags catégorisés
  getById: (id) => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.id = ?
    GROUP BY r.id
  `, [id]),

  // Récupérer les recettes favorites avec tags catégorisés
  getFavorites: () => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.is_favorite = true
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `),

  // Rechercher des recettes avec tags catégorisés
  search: (searchTerm) => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.title LIKE ? OR r.description LIKE ?
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `, [`%${searchTerm}%`, `%${searchTerm}%`]),

  // Filtrer par tags avec catégories
  filterByTags: (tags) => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE t.name IN (${tags.map(() => '?').join(',')})
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `, tags),

  // Filtrer par catégorie de tags
  filterByTagCategory: (category) => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE t.category = ?
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `, [category]),

  // Filtrer par difficulté
  filterByDifficulty: (difficulty) => query(`
    SELECT 
      r.*,
      COALESCE(
        NULLIF(
          JSON_ARRAYAGG(
            CASE 
              WHEN t.name IS NOT NULL THEN JSON_OBJECT('name', t.name, 'category', t.category)
              ELSE NULL
            END
          ),
          JSON_ARRAY(NULL)
        ),
        JSON_ARRAY()
      ) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.difficulty = ?
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `, [difficulty]),

  // Récupérer toutes les catégories de tags
  getTagCategories: () => query(`
    SELECT DISTINCT category FROM tags ORDER BY category
  `),

  // Récupérer les tags par catégorie
  getTagsByCategory: (category) => query(`
    SELECT name, category FROM tags WHERE category = ? ORDER BY name
  `, [category]),

  // Ajouter une recette avec difficulté
  create: (recipe) => query(`
    INSERT INTO recipes (id, title, description, ingredients, steps, nutrition, prepTime, cookTime, servings, difficulty, is_favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    recipe.id,
    recipe.title,
    recipe.description,
    JSON.stringify(recipe.ingredients),
    JSON.stringify(recipe.steps),
    JSON.stringify(recipe.nutrition),
    recipe.prepTime || 0,
    recipe.cookTime || 0,
    recipe.servings || 1,
    recipe.difficulty || 1,
    recipe.isFavorite || false
  ]),

  // Mettre à jour une recette avec difficulté
  update: (id, recipe) => query(`
    UPDATE recipes 
    SET title = ?, description = ?, ingredients = ?, steps = ?, nutrition = ?, prepTime = ?, cookTime = ?, servings = ?, difficulty = ?, is_favorite = ?
    WHERE id = ?
  `, [
    recipe.title,
    recipe.description,
    JSON.stringify(recipe.ingredients),
    JSON.stringify(recipe.steps),
    JSON.stringify(recipe.nutrition),
    recipe.prepTime || 0,
    recipe.cookTime || 0,
    recipe.servings || 1,
    recipe.difficulty || 1,
    recipe.isFavorite || false,
    id
  ]),

  // Supprimer une recette
  delete: (id) => query('DELETE FROM recipes WHERE id = ?', [id]),

  // Basculer le statut favori
  toggleFavorite: (id, isFavorite) => query(
    'UPDATE recipes SET is_favorite = ? WHERE id = ?',
    [isFavorite, id]
  )
}; 