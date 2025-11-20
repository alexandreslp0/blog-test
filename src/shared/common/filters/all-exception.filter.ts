/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { errorMessage } from '../log';
import { Request, Response } from 'express';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let status = exception?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    status = exception instanceof HttpException ? exception.getStatus() : status;

    errorMessage(
      'unkown',
      'HTTP',
      `${request.method} ${request.url}`,
      status,
      'unknown',
      'unknown',
      exception instanceof Error ? (exception.stack ?? '') : '',
      exception,
    );

    const error = {
      id: '',
      code: exception.name,
      title: exception.message,
      status: status?.toString() || '500',
      detail: exception['response']?.message ?? exception['response']?.detail ?? 'internal server error',
    };

    response.status(status).send(error);
  }
}
