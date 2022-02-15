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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  orders: OrderEntity[];

  @Column()
  productId: string;

  @ManyToMany(() => ProductEntity, (product) => product.id)
  products: ProductEntity[];

  @Column()
  amount: number;

  @Column({ type: 'decimal', scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
