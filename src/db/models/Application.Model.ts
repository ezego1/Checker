import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Server from './Server.Model';
import History from './History.Model';

@Entity({ name: 'application' })
export default class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 1000, unique: true })
  applicationName: string;

  @Column('varchar', { length: 1000 })
  applicationType: string;

  @Column('varchar', { length: 1000 })
  applicationDescription: string;

  @Column('varchar', { length: 1000 })
  applicationPort: string;

  @Column('varchar', { length: 1000 })
  endPoint: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => History, (history) => history.application, { cascade: true })
  history: History[];

  @ManyToMany(() => Server, (server) => server.applications, { cascade: true })
  @JoinTable()
  servers: Server[];
}
