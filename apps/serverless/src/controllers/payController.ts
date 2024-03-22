// lobby function
import { OpenAPIHono } from "@hono/zod-openapi"
import { paySchema, bodySchema } from "../models/payModel"
import { createController, ResponseType } from "../utils"

const responses: ResponseType[] = [
  {
    statusCode: 200,
    content: {
      'application/json': {
        schema: paySchema,
      },
    },
    description: 'Retrieve the user',
  },
  {
    statusCode: 404,
    description: 'User not found',
  },
];

const UserController = createController('post', '/pay/{id}', paySchema, responses, bodySchema)

export default (app: OpenAPIHono) => {
  // path: /users/{id}
  app.openapi(UserController, (c: any) => {
    const { id } = c.req.valid('param') as any
    const { data } = c.req.valid('json') as any
    return c.json({
      id,
      data
    })
  })
}