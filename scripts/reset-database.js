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
  database: process.env.DB_NAME || 'nextyou',
  multipleStatements: true
};

async function resetDatabase() {
  let connection;
  
  try {
    console.log('🔄 Début de la réinitialisation de la base de données...');
    
    // Connexion à la base de données
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connexion à MySQL établie');
    
    // Suppression des données existantes
    console.log('🗑️  Suppression des données existantes...');
    await connection.execute('DELETE FROM recipe_tags');
    await connection.execute('DELETE FROM recipes');
    await connection.execute('DELETE FROM tags');
    console.log('✅ Données supprimées');
    
    // Réinitialisation des auto-increment
    await connection.execute('ALTER TABLE tags AUTO_INCREMENT = 1');
    console.log('✅ Auto-increment réinitialisé');
    
    // Lecture et exécution du script d'initialisation
    console.log('📝 Exécution du script d\'initialisation...');
    const initFilePath = path.join(__dirname, '..', 'database', 'init.sql');
    const initContent = fs.readFileSync(initFilePath, 'utf8');
    await connection.execute(initContent);
    console.log('✅ Structure de base créée');
    
    // Lecture et exécution du script de données
    console.log('📝 Exécution du script de données...');
    const seedFilePath = path.join(__dirname, '..', 'database', 'seed-data.sql');
    const seedContent = fs.readFileSync(seedFilePath, 'utf8');
    await connection.execute(seedContent);
    console.log('✅ Données insérées');
    
    console.log('✅ Base de données réinitialisée avec succès !');
    
    // Vérification finale
    console.log('\n📊 Vérification finale :');
    
    const [recipes] = await connection.execute('SELECT COUNT(*) as count FROM recipes');
    console.log(`   - ${recipes[0].count} recettes`);
    
    const [tags] = await connection.execute('SELECT COUNT(*) as count FROM tags');
    console.log(`   - ${tags[0].count} tags`);
    
    const [recipeTags] = await connection.execute('SELECT COUNT(*) as count FROM recipe_tags');
    console.log(`   - ${recipeTags[0].count} associations`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Connexion fermée');
    }
  }
}

// Exécution du script
resetDatabase(); 