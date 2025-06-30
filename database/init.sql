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
    metadata JSON NOT NULL,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des tags
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category ENUM('diet', 'cuisine', 'difficulty', 'time', 'custom') DEFAULT 'custom',
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

-- Types de cuisine
('française', 'cuisine'),
('italienne', 'cuisine'),
('asiatique', 'cuisine'),
('méditerranéenne', 'cuisine'),
('mexicaine', 'cuisine'),

-- Difficulté
('facile', 'difficulty'),
('moyen', 'difficulty'),
('difficile', 'difficulty'),

-- Temps de préparation
('rapide (< 15min)', 'time'),
('moyen (15-30min)', 'time'),
('long (> 30min)', 'time'); 