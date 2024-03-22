import { z } from 'zod'
import { createParamSchema, createParamSchema2, createSchema } from '../utils';

type Binding = {
  "hirai": KVNamespace
}
export const ParamsSchema = z.object({
  id: createParamSchema('id', 'string', 2),
});

export const RegisterSchema = createSchema('Register', {
  id: { type: 'string', example: '12' },
});

export const RegisterParamsSchema = z.object({
  id: createParamSchema('id', 'string', 2),
  // data: createParamSchema2('data', 'string', 0 ),
});

export const UserSchema = createSchema('User', {
  id: { type: 'string', example: '123' },
  store: { type: 'string', example: 'John Doe' },
});

export const bodySchema = z.object({
  data: z.string(),
});