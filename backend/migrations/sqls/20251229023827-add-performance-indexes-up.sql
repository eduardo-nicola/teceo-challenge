CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_product_colors_product_id ON product_colors(product_id);
CREATE INDEX IF NOT EXISTS idx_product_colors_color_id ON product_colors(color_id);
CREATE INDEX IF NOT EXISTS idx_skus_product_color_id_price ON skus(product_color_id, price);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);


CREATE INDEX IF NOT EXISTS idx_products_code_trgm ON products USING gin(code gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin(name gin_trgm_ops);
