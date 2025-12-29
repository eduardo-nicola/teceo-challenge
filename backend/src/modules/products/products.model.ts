import { Column, Entity, Index } from 'typeorm';
import BaseModel from '../../../commons/models/base.model';

@Entity('products')
@Index('idx_products_code_trgm', { synchronize: false })
@Index('idx_products_name_trgm', { synchronize: false })
export default class Product extends BaseModel {
  @Column({ name: 'code', type: 'text' })
  code: string;

  @Column({ name: 'name', type: 'text' })
  @Index('idx_products_name')
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;
}
