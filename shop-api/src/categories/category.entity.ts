import { ProductEntity } from 'src/products/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Category' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, default: [] })
  @OneToMany(() => ProductEntity, (product) => product.categories)
  product: ProductEntity[];

  @Column('text')
  name: string[];

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
