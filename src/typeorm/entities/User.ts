import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: new Date().toJSON().toString() })
  createdAt: string;
}
