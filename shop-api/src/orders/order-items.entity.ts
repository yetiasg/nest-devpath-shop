import { Expose } from 'class-transformer';
import { ProductEntity } from 'src/products/product.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'OrderItems' })
export class OrderItemsEntity extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  orderId: string;

  @Expose()
  @Column()
  productId: string;

  @Expose()
  @ManyToOne(() => OrderEntity, (order) => order.id)
  orders: OrderEntity[];

  @Expose()
  @ManyToMany(() => ProductEntity, (product) => product.id)
  products: ProductEntity[];

  @Expose()
  @Column()
  amount: number;

  @Expose()
  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
