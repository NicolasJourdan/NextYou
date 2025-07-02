import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'nextyou',
  password: process.env.DB_PASSWORD || 'nextyou123',
  database: process.env.DB_NAME || 'nextyou'
};

async function seedDatabase() {
  let connection;
  
  try {
    console.log('🌱 Début du peuplement de la base de données...');
    
    // Connexion à la base de données
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connexion à MySQL établie');
    
    // Lecture et exécution du fichier des recettes
    console.log('📝 Insertion des recettes...');
    const recipesFilePath = path.join(__dirname, '..', 'database', 'seed-recipes.sql');
    const recipesContent = fs.readFileSync(recipesFilePath, 'utf8');
    
    const recipeQueries = recipesContent
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0 && !query.startsWith('--'));
    
    for (let i = 0; i < recipeQueries.length; i++) {
      const query = recipeQueries[i];
      if (query.trim()) {
        try {
          await connection.execute(query);
          console.log(`   ✅ Recette ${i + 1}/${recipeQueries.length} insérée`);
        } catch (error) {
          console.error(`   ❌ Erreur dans la recette ${i + 1}:`, error.message);
          throw error;
        }
      }
    }
    
    // Lecture et exécution du fichier des associations de tags
    console.log('📝 Association des tags...');
    const tagsFilePath = path.join(__dirname, '..', 'database', 'seed-tags.sql');
    const tagsContent = fs.readFileSync(tagsFilePath, 'utf8');
    
    const tagQueries = tagsContent
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0 && !query.startsWith('--'));
    
    for (let i = 0; i < tagQueries.length; i++) {
      const query = tagQueries[i];
      if (query.trim()) {
        try {
          await connection.execute(query);
          console.log(`   ✅ Association ${i + 1}/${tagQueries.length} créée`);
        } catch (error) {
          console.error(`   ❌ Erreur dans l'association ${i + 1}:`, error.message);
          throw error;
        }
      }
    }
    
    console.log('✅ Base de données peuplée avec succès !');
    
    // Vérification des données insérées
    console.log('\n📊 Vérification des données insérées :');
    
    const [recipes] = await connection.execute('SELECT COUNT(*) as count FROM recipes');
    console.log(`   - ${recipes[0].count} recettes insérées`);
    
    const [tags] = await connection.execute('SELECT COUNT(*) as count FROM tags');
    console.log(`   - ${tags[0].count} tags créés`);
    
    const [recipeTags] = await connection.execute('SELECT COUNT(*) as count FROM recipe_tags');
    console.log(`   - ${recipeTags[0].count} associations recette-tag créées`);
    
    // Affichage de quelques recettes
    console.log('\n🍽️  Recettes disponibles :');
    const [recipeList] = await connection.execute(`
      SELECT r.title, r.difficulty, r.prepTime, r.cookTime, r.servings
      FROM recipes r
      ORDER BY r.title
    `);
    
    recipeList.forEach(recipe => {
      console.log(`   - ${recipe.title} (Difficulté: ${recipe.difficulty}/5, Temps: ${recipe.prepTime + recipe.cookTime}min, ${recipe.servings} pers.)`);
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base de données:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connexion fermée');
    }
  }
}

// Exécution du script
seedDatabase(); 