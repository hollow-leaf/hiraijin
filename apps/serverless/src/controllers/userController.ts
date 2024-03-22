// lobby function
import { OpenAPIHono, createRoute } from "@hono/zod-openapi"
import { UserSchema, ParamsSchema, RegisterSchema, RegisterParamsSchema, bodySchema } from "../models/userModel"
import { createController, ResponseType } from "../utils"
type Bindings = { hirai: KVNamespace }
const responses: ResponseType[] = [
  {
    statusCode: 200,
    content: {
      'application/json': {
        schema: UserSchema,
      },
    },
    description: 'Retrieve the user',
  },
  {
    statusCode: 404,
    description: 'User not found',
  },
];

const UserController = createController('get', '/users/{id}', ParamsSchema, responses)

const RegisterResponses: ResponseType[] = [

  {
    statusCode: 200,
    content: {
      'application/json': {
        schema: RegisterParamsSchema,
      },
    },
    description: 'Retrieve the user',
  },
  {
    statusCode: 404,
    description: 'User not found',
  },
];
const RegisterController = createController('post', '/register/{id}', RegisterParamsSchema, RegisterResponses, bodySchema)


export default (app: OpenAPIHono) => {
  // path: /users/{id}
  app.openapi(UserController, async (c: any) => {
    const { id } = c.req.valid('param') as any
    const data = await c.env.hirai?.get(id)
    console.log('data', data)
    return c.json({
      id,
      data
    })
  })

  app.openapi(RegisterController, async (c: any) => {
    const { id } = c.req.valid('param') as any
    const {data} = c.req.valid('json') as any
    await c.env.hirai?.put(id, data)
    // const { data, signature, publicKey } = c.req.valid('query') as any
    return c.json({   
      id,
      data
    })
  })
}