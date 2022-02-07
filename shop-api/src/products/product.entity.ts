import { CategoryEntity } from 'src/categories/category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'array' })
  @ManyToMany(() => CategoryEntity, (category) => category.id, {
    cascade: true,
  })
  categories: CategoryEntity[];

  @Column()
  stock: number;

  @Column()
  archived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
