import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Application from './Application.Model';

@Entity({ name: 'history' })
export default class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 1000 })
  status: string;

  @Column('varchar', { length: 1000 })
  serverMapped: string;

  @Column('varchar', { length: 1000 })
  dateScan: string;

  @Column('varchar', { length: 1000 })
  url: string;

  @Column({ default: true })
  isUp: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Application, (application) => application.history)
  application: Application;
}
