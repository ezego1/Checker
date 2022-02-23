import {
  // BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Application from './Application.Model';

@Entity('server')
export default class Server {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 1000 })
  serverName: string;

  @Column('varchar', { length: 1000, unique: true })
  serverIp: string;

  @Column('varchar', { length: 1000 })
  cpu: string;

  @Column('varchar', { length: 1000 })
  memory: string;

  @Column('varchar', { length: 1000 })
  storage: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(() => Application, (application) => application.servers)
  applications: Application[];
}
