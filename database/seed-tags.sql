-- Association des recettes avec les tags
USE nextyou;

-- Salade Quinoa (rec-001)
INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-001', id FROM tags WHERE name = 'végétarien';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-001', id FROM tags WHERE name = 'vegan';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-001', id FROM tags WHERE name = 'sans gluten';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-001', id FROM tags WHERE name = 'méditerranéenne';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-001', id FROM tags WHERE name = 'déjeuner';

-- Poulet Grillé (rec-002)
INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-002', id FROM tags WHERE name = 'riche en protéines';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-002', id FROM tags WHERE name = 'française';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-002', id FROM tags WHERE name = 'dîner';

-- Smoothie Bowl (rec-003)
INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-003', id FROM tags WHERE name = 'végétarien';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-003', id FROM tags WHERE name = 'vegan';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-003', id FROM tags WHERE name = 'sans gluten';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-003', id FROM tags WHERE name = 'petit-déjeuner';

-- Pasta Carbonara (rec-004)
INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-004', id FROM tags WHERE name = 'italienne';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-004', id FROM tags WHERE name = 'dîner';

-- Buddha Bowl (rec-005)
INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-005', id FROM tags WHERE name = 'végétarien';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-005', id FROM tags WHERE name = 'vegan';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-005', id FROM tags WHERE name = 'sans gluten';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-005', id FROM tags WHERE name = 'asiatique';

INSERT INTO recipe_tags (recipe_id, tag_id) 
SELECT 'rec-005', id FROM tags WHERE name = 'déjeuner'; 