import { Expose } from 'class-transformer';
import { UserEntity } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.type';

@Entity({ name: 'Order' })
export class OrderEntity extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  @ManyToOne(() => UserEntity, (user) => user.id)
  userId: string;

  @Expose()
  @Column({ type: 'decimal', scale: 2 })
  totalPrice: number;

  @Expose()
  @Column({ default: OrderStatus.NEW })
  status: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
