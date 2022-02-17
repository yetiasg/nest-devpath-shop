import { Expose } from 'class-transformer';
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
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  name: string;

  @Expose()
  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @Expose()
  @Column({ type: 'text' })
  description: string;

  @Expose()
  @ManyToMany(() => CategoryEntity, { cascade: true })
  @JoinTable()
  categories: CategoryEntity[];

  @Expose()
  @Column()
  stock: number;

  @Expose()
  @Column({ default: false })
  archived: boolean;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
