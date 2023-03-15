import { Optional } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Person } from 'src/auth/person.model';
import { Question } from 'src/question/question.model';

interface AnswerAttributes {
  id: number;
  body: string;
  question_id: number;
  person_id: number;
}

@Table({
  tableName: 'answer',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Answer extends Model<
  AnswerAttributes,
  Optional<AnswerAttributes, 'id'>
> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @ForeignKey(() => Question)
  @Column
  question_id: number;

  @ForeignKey(() => Person)
  @Column
  person_id: number;

  @BelongsTo(() => Question)
  question: Question;

  @BelongsTo(() => Person)
  author: Person;
}
