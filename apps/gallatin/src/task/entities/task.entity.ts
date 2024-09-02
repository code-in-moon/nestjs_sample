import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform, Type } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;
  @Type(() => Date)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  createdAt: string;
  @Type(() => Date)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  updatedAt: string;

  @ManyToOne((type) => Task, (task) => task.children, { onDelete: 'SET NULL' })
  parent: Task;

  @OneToMany((type) => Task, (task) => task.parent)
  children: Task[];
}
