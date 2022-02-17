import { Expose } from 'class-transformer';
import { Role } from 'src/role/role.type';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class UserEntity extends BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ type: 'boolean', nullable: false, default: false })
  active: boolean;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column({ nullable: true })
  firstName?: string;

  @Expose()
  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'json', nullable: true })
  address: unknown;

  @Column({ default: '' })
  activationToken: string;

  @Column({ default: '' })
  resetPasswordToken: string;

  @Column()
  password: string;

  @Expose()
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
