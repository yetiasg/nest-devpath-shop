import { CategoryEntity } from 'src/categories/category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Product' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => CategoryEntity, { cascade: true })
  @JoinTable()
  categories: CategoryEntity[];

  @Column()
  stock: number;

  @Column({ default: false })
  archived: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
