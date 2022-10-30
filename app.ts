import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import AppError from './utils/appError';
import { errorController } from './controllers';
import Routesv1 from './routes';
import swaggerSpec from './swaggerSpec';
import config from './config';

const app = express();

/* MIDDLEWARES 👇 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

/* Routes 🎯 */

/**
 * This is really bad in real projects.
 * But since we don't have budget to buy bigger instance,
 * disabling this in production is our best choice.
 */
if (config.NODE_ENV === 'development') {
  app.use('/v1', Routesv1);
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

/* Error handling 💥 */
app.use(errorController);

export default app;
