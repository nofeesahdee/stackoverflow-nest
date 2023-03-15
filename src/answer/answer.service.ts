import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/auth/person.model';
import { CreateAnswerDto } from './answer.dto';
import { Answer } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
  ) {}

  fetchAnswerandAuthor(answerId: number) {
    return this.answerModel.findByPk(answerId, {
      attributes: ['id', 'body', 'question_id'],
      include: [
        {
          model: Person,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });
  }

  async create(personId: number, data: CreateAnswerDto) {
    const created = await this.answerModel.create({
      ...data,
      person_id: personId,
    });

    const qandAnswer = await this.fetchAnswerandAuthor(created.id);

    return qandAnswer;
  }

  async fetchAll() {
    const answer = await this.answerModel.findAll({
      attributes: ['id', 'body', 'question_id'],
      include: [
        {
          model: Person,
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });

    return answer;
  }

  async update(answerId: number, attrs: Partial<Answer>) {
    const answer = await this.answerModel.findByPk(answerId, {
      attributes: ['id', 'body', 'question_id'],
    });

    Object.assign(answer, attrs);

    return answer;
  }

  async remove(answerId: number) {
    const answer = await this.answerModel.findByPk(answerId, {
      attributes: ['id', 'body', 'question_id'],
    });

    return this.answerModel.destroy({
      where: {
        id: answer.id,
      },
    });
  }
}
