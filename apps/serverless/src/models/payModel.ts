import { z } from 'zod'
import { createParamSchema, createSchema } from '../utils';

type Binding = {
  "hirai": KVNamespace
}

export const paySchema = createSchema('User', {
  id: { type: 'string', example: '1234567890' },
});

export const bodySchema = z.object({
  data: z.string(),
});