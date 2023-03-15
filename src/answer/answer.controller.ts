import { SuccessResponseObject } from '@akhilome/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiSchema } from 'src/common/joi.pipe';
import {
  CreateAnswerDto,
  createAnswerSchema,
  UpdateAnswerDto,
} from './answer.dto';
import { AnswerService } from './answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async handleCreateAnswer(
    @Req() req,
    @Body(JoiSchema(createAnswerSchema)) body: CreateAnswerDto,
  ) {
    const personId: number = req.user.id;
    const data = await this.answerService.create(personId, body);

    return new SuccessResponseObject('Answer created', data);
  }

  @Get('/')
  async fetchAllAnswers() {
    const data = await this.answerService.fetchAll();

    return new SuccessResponseObject('Answers retrieved', data);
  }

  @Get('/:id')
  async fetchOneAnswer(@Param('id') id: string) {
    const data = await this.answerService.fetchAnswerandAuthor(+id);

    if (!data) {
      throw new NotFoundException('Answer does not exist');
    }

    return new SuccessResponseObject('Answer retrieved', data);
  }

  @Put('/:id')
  async updateAnswer(@Param('id') id: string, @Body() body: UpdateAnswerDto) {
    return this.answerService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteAnswer(@Param('id') id: string) {
    const removed = this.answerService.remove(parseInt(id));

    return new SuccessResponseObject('Answer deleted successfully', removed);
  }
}
