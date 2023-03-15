import { Optional } from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Answer } from 'src/answer/answer.model';
import { Question } from 'src/question/question.model';

interface PersonAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hash: string;
}

@Table({
  tableName: 'person',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Person extends Model<
  PersonAttributes,
  Optional<PersonAttributes, 'id'>
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  hash: string;

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Answer)
  answer: Answer[];
}
