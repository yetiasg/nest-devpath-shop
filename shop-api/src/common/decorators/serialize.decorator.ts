import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

interface ClassConstructor {
  new (...args: any[]);
}

export function Serialize(entity: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(entity));
}
