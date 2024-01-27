import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetHeader = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const headers = req.rawHeaders;
  if (!headers)
    throw new InternalServerErrorException('Headers not found (request)');
  return headers;
});
