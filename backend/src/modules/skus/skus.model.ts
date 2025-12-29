import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import BaseModel from '../../../commons/models/base.model';
import Color from '../colors/colors.model';
import ProductColor from '../product-colors/product-colors.model';

@Entity('skus')
@Index('idx_skus_product_color_id_price', ['productColor', 'price'])
export default class Sku extends BaseModel {
  @ManyToOne(() => ProductColor)
  @JoinColumn({ name: 'product_color_id', referencedColumnName: 'id' })
  productColor: ProductColor;

  @ManyToOne(() => Color)
  @JoinColumn({ name: 'product_size_id', referencedColumnName: 'id' })
  productSize: Color;

  @Column({ name: 'price', type: 'numeric' })
  price: number;
}
