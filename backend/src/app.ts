import express from 'express';
import testRouter from './routes/test';
import userRouter from './routes/user'
import { errorMiddleware } from './middleware/error';
import { env } from './config/env';
import { dbTest } from './services/test';
import { authenticateJWT } from './middleware/auth';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
  openapi: '3.0.1',
    info: {
      title: 'DevLink API',
      version: '0.3.1',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.devlink.com',
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['./src/routes/user.{ts,js}'],
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Docs Setup
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Test Landing Page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Auth Middleware
app.use(authenticateJWT);

// Set up routes
app.use('/user', userRouter);
app.use('/test', testRouter);

// TODO: Finish Error Middleware
// Set up error handling middleware
app.use(errorMiddleware);


// Start the server
app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
});

export default app;
