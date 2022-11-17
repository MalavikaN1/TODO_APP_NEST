import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item: string;

  @ManyToOne(() => User, (user) => user.list)
  @JoinColumn({ name: 'userId' })
  user: User;
}
