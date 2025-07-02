-- Initialisation de la base de données NextYou
USE nextyou;

-- Table des recettes
CREATE TABLE IF NOT EXISTS recipes (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients JSON NOT NULL,
    steps JSON NOT NULL,
    nutrition JSON NOT NULL,
    prepTime INT DEFAULT 0,
    cookTime INT DEFAULT 0,
    servings INT DEFAULT 1,
    difficulty INT DEFAULT 1 CHECK (difficulty >= 1 AND difficulty <= 5),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des tags
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category ENUM('diet', 'cuisine', 'meal', 'custom') DEFAULT 'custom',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison recettes-tags
CREATE TABLE IF NOT EXISTS recipe_tags (
    recipe_id VARCHAR(36),
    tag_id INT,
    PRIMARY KEY (recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_recipes_title ON recipes(title);
CREATE INDEX idx_recipes_favorite ON recipes(is_favorite);
CREATE INDEX idx_recipes_difficulty ON recipes(difficulty);
CREATE INDEX idx_recipes_created ON recipes(created_at);
CREATE INDEX idx_tags_category ON tags(category);

-- Insertion de tags de base
INSERT IGNORE INTO tags (name, category) VALUES
-- Régimes alimentaires
('végétarien', 'diet'),
('vegan', 'diet'),
('sans gluten', 'diet'),
('sans lactose', 'diet'),
('faible en calories', 'diet'),
('riche en protéines', 'diet'),
('paleo', 'diet'),
('keto', 'diet'),

-- Types de cuisine
('française', 'cuisine'),
('italienne', 'cuisine'),
('asiatique', 'cuisine'),
('méditerranéenne', 'cuisine'),
('mexicaine', 'cuisine'),
('indienne', 'cuisine'),
('japonaise', 'cuisine'),
('thaïlandaise', 'cuisine'),

-- Types de repas
('petit-déjeuner', 'meal'),
('déjeuner', 'meal'),
('dîner', 'meal'),
('dessert', 'meal'),
('collation', 'meal'),
('apéritif', 'meal');
