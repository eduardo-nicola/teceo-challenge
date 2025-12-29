DROP INDEX IF EXISTS idx_products_name_trgm;
DROP INDEX IF EXISTS idx_products_code_trgm;
DROP INDEX IF EXISTS idx_products_name;
DROP INDEX IF EXISTS idx_skus_product_color_id_price;
DROP INDEX IF EXISTS idx_product_colors_color_id;
DROP INDEX IF EXISTS idx_product_colors_product_id;

DROP EXTENSION IF EXISTS pg_trgm;
