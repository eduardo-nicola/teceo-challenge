import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import Page from '../../../commons/dtos/page.dto';
import { ListProductColorsDTO } from './dtos/list-product-colors.dto';
import ListProductColorsFilter from './dtos/list-product-colors.filter';
import ProductColor from './product-colors.model';

@Injectable()
export default class ProductColorsService {
  constructor(
    @InjectRepository(ProductColor)
    private readonly repository: Repository<ProductColor>,
  ) {}

  createQueryBuilder(): SelectQueryBuilder<ProductColor> {
    return this.repository.createQueryBuilder('productColor');
  }

  async list(filter: ListProductColorsFilter): Promise<Page<ListProductColorsDTO>> {
    // Contagem otimizada
    const countQueryBuilder = await this.createQueryBuilder().select('productColor.id').getCount();
  
    const queryBuilder = this.createQueryBuilder()
      .innerJoinAndSelect('productColor.product', 'product')
      .innerJoinAndSelect('productColor.color', 'color')
      .orderBy('product.name', 'ASC')
      .addOrderBy('productColor.id', 'ASC');

    filter.createWhere(queryBuilder);
    filter.paginate(queryBuilder);

    const productColors = await queryBuilder.getMany();

    if(productColors.length === 0) {
      return Page.of([], countQueryBuilder);
    }

    const ids = productColors.map(pc => pc.id);
    const prices = await this.createQueryBuilder()
      .select('productColor.id', 'id')
      .addSelect('COALESCE(MIN(sku.price), 0)', 'price')
      .leftJoin('productColor.skus', 'sku')
      .where('productColor.id IN (:...ids)', { ids })
      .groupBy('productColor.id')
      .getRawMany();

    const priceMap = new Map(prices.map(p => [p.id, Number(p.price)]));

    // Mapeia para DTO com preços
    const productColorsWithPrices: ListProductColorsDTO[] = productColors.map(productColor => ({
      ...productColor,
      price: priceMap.get(productColor.id) || 0,
    }));

    return Page.of(productColorsWithPrices, countQueryBuilder);
  }
}
