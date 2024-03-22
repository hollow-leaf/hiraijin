import { OpenAPIHono } from '@hono/zod-openapi'
import { payController, swaggerController, userController } from './controllers'

type Bindings = { hirai: KVNamespace }

const app: any = new OpenAPIHono<{ Bindings: Bindings }>()

swaggerController(app)
userController(app)
payController(app)

export default app
