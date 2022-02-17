import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private entity: any) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.entity, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
