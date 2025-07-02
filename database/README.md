# Base de Données NextYou

Ce dossier contient tous les fichiers nécessaires à la gestion de la base de données MySQL pour l'application NextYou.

## Structure

- `init.sql` - Script d'initialisation de la base de données (tables, index, tags de base)
- `seed-data.sql` - Données de test avec 5 recettes d'exemple
- `README.md` - Ce fichier de documentation

## Scripts disponibles

### Peupler la base de données avec des données de test

```bash
npm run seed-db
```

Ce script va :
- Se connecter à la base de données MySQL
- Exécuter le fichier `seed-data.sql`
- Insérer 5 recettes d'exemple avec leurs tags
- Afficher un résumé des données insérées

### Réinitialiser complètement la base de données

```bash
npm run reset-db
```

Ce script va :
- Supprimer toutes les données existantes
- Réinitialiser la structure de la base de données
- Insérer les données de test
- Utile pour repartir de zéro

## Recettes incluses dans les données de test

1. **Salade Quinoa aux Légumes** - Végétarien, vegan, sans gluten, méditerranéenne
2. **Poulet Grillé aux Herbes** - Riche en protéines, française
3. **Smoothie Bowl Acai** - Végétarien, vegan, sans gluten, petit-déjeuner
4. **Pasta Carbonara** - Italienne, dîner
5. **Buddha Bowl Végétarien** - Végétarien, vegan, sans gluten, asiatique

## Structure des données

### Table `recipes`
- `id` - Identifiant unique de la recette
- `title` - Titre de la recette
- `description` - Description courte
- `ingredients` - Liste des ingrédients (JSON)
- `steps` - Étapes de préparation (JSON)
- `nutrition` - Informations nutritionnelles (JSON)
- `prepTime` - Temps de préparation en minutes
- `cookTime` - Temps de cuisson en minutes
- `servings` - Nombre de portions
- `difficulty` - Niveau de difficulté (1-5)
- `is_favorite` - Statut favori

### Table `tags`
- `id` - Identifiant unique du tag
- `name` - Nom du tag
- `category` - Catégorie (diet, cuisine, meal, custom)

### Table `recipe_tags`
- Table de liaison entre recettes et tags

## Configuration

Les scripts utilisent les variables d'environnement suivantes :
- `DB_HOST` - Hôte MySQL (défaut: mysql)
- `DB_PORT` - Port MySQL (défaut: 3306)
- `DB_USER` - Utilisateur MySQL (défaut: nextyou)
- `DB_PASSWORD` - Mot de passe MySQL (défaut: nextyou123)
- `DB_NAME` - Nom de la base de données (défaut: nextyou)

## Utilisation avec Docker

Si vous utilisez Docker Compose, assurez-vous que le conteneur MySQL est démarré :

```bash
docker-compose up -d mysql
```

Puis exécutez les scripts :

```bash
npm run seed-db
``` 