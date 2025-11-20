import { Logger } from '@nestjs/common';

export function errorMessage(
  requestId = 'unknown',
  serviceType: string,
  serviceCalled: string,
  statusCode: number,
  userId: string,
  userName: string,
  exceptionStack: string,
  exceptionError: object,
) {
  const logger = new Logger();
  const message = `id=${requestId} stage=error ${serviceType} ${serviceCalled} userId=${userId} userName=${userName} status=${statusCode} stack=${exceptionStack?.replace(/\n/g, ' ').replace(/\s+/g, ' ')} error=${JSON.stringify(exceptionError)}`;

  logger.error(message);
}
