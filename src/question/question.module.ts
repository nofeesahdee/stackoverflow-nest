import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { QuestionController } from './question.controller';
import { Question } from './question.model';
import { QuestionService } from './question.service';

@Module({
  imports: [SequelizeModule.forFeature([Question]), AuthModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
