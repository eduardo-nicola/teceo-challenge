CREATE INDEX IF NOT EXISTS idx_colors_id ON colors(id);
CREATE INDEX IF NOT EXISTS idx_customers_id ON customers(id);
CREATE INDEX IF NOT EXISTS idx_orders_id ON orders(id);
CREATE INDEX IF NOT EXISTS idx_order_items_id ON order_items(id);
CREATE INDEX IF NOT EXISTS idx_products_id ON products(id);
CREATE INDEX IF NOT EXISTS idx_product_colors_id ON product_colors(id);
CREATE INDEX IF NOT EXISTS idx_product_sizes_id ON product_sizes(id);
CREATE INDEX IF NOT EXISTS idx_skus_id ON skus(id);