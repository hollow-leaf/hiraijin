import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerController, userController } from './controllers'

type Bindings = { hirai: KVNamespace }

const app = new OpenAPIHono<{ Bindings: Bindings }>()

swaggerController(app)
userController(app)

export default app
