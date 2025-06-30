import mysql from 'mysql2/promise';

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  port: process.env.DB_PORT || 3307,
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
  // Récupérer toutes les recettes
  getAll: () => query(`
    SELECT r.*, GROUP_CONCAT(t.name) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `),

  // Récupérer une recette par ID
  getById: (id) => query(`
    SELECT r.*, GROUP_CONCAT(t.name) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.id = ?
    GROUP BY r.id
  `, [id]),

  // Récupérer les recettes favorites
  getFavorites: () => query(`
    SELECT r.*, GROUP_CONCAT(t.name) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.is_favorite = true
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `),

  // Rechercher des recettes
  search: (searchTerm) => query(`
    SELECT r.*, GROUP_CONCAT(t.name) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE r.title LIKE ? OR r.description LIKE ?
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `, [`%${searchTerm}%`, `%${searchTerm}%`]),

  // Filtrer par tags
  filterByTags: (tags) => query(`
    SELECT r.*, GROUP_CONCAT(t.name) as tags
    FROM recipes r
    LEFT JOIN recipe_tags rt ON r.id = rt.recipe_id
    LEFT JOIN tags t ON rt.tag_id = t.id
    WHERE t.name IN (${tags.map(() => '?').join(',')})
    GROUP BY r.id
    ORDER BY r.created_at DESC
  `, tags),

  // Ajouter une recette
  create: (recipe) => query(`
    INSERT INTO recipes (id, title, description, ingredients, steps, nutrition, metadata, is_favorite)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    recipe.id,
    recipe.title,
    recipe.description,
    JSON.stringify(recipe.ingredients),
    JSON.stringify(recipe.steps),
    JSON.stringify(recipe.nutrition),
    JSON.stringify(recipe.metadata),
    recipe.isFavorite || false
  ]),

  // Mettre à jour une recette
  update: (id, recipe) => query(`
    UPDATE recipes 
    SET title = ?, description = ?, ingredients = ?, steps = ?, nutrition = ?, metadata = ?, is_favorite = ?
    WHERE id = ?
  `, [
    recipe.title,
    recipe.description,
    JSON.stringify(recipe.ingredients),
    JSON.stringify(recipe.steps),
    JSON.stringify(recipe.nutrition),
    JSON.stringify(recipe.metadata),
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