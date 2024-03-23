// lobby function
import { OpenAPIHono } from "@hono/zod-openapi"
import { paySchema, bodySchema } from "../models/payModel"
import { createController, ResponseType } from "../utils"
import { transfer } from "../service/usdcService";
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
  app.openapi(UserController, async (c: any) => {
    const { id } = c.req.valid('param') as any
    const { data } = c.req.valid('json') as any
    const res = JSON.parse(data)
    const result =  await transfer(res.from, res.to, res.tokenId, res.amount)
    return c.json({
      result
    })
  })
}