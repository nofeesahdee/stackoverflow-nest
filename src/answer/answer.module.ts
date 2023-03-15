import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.model';
import { AnswerService } from './answer.service';

@Module({
  imports: [SequelizeModule.forFeature([Answer]), AuthModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
