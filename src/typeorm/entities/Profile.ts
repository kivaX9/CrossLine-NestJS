import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({ nullable: true })
  telephone: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
