import { ErrorResponseObject } from '@akhilome/common';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  private handleUnknownError(e: unknown, res: Response) {
    this.logger.error(e);
    res.status(500).json(new ErrorResponseObject('An unknown error occured'));
  }

  private handleHttpException(e: HttpException, res: Response) {
    const status = e.getStatus();
    const exceptionResponse = e.getResponse() as string | Error;

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse.message;

    res.status(status).json(new ErrorResponseObject(message));
  }

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, res);
    }

    return this.handleUnknownError(exception, res);
  }
}
