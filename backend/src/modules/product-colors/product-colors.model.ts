import { Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseModel from '../../../commons/models/base.model';
import Color from '../colors/colors.model';
import Product from '../products/products.model';
import Sku from '../skus/skus.model';

@Entity('product_colors')
export default class ProductColor extends BaseModel {
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  @Index('idx_product_colors_product_id')
  product: Product;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_id', referencedColumnName: 'id' })
  @Index('idx_product_colors_color_id')
  color: Color;

  @OneToMany(
    () => Sku,
    (sku) => sku.productColor,
  )
  skus: Sku[];
}
