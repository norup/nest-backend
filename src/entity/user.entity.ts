import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'firstName', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'dateOfBirth', type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({
    name: 'profilePicture',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profilePicture?: string;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
