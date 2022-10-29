import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import config from './config';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Backend Api doc for Unique Me',
    version: '0.0.1-alpha',
    description:
      'Unique Me is a platform where anyone can check the availability of a username across multiple social media platforms or domain names with just one click',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Adarsh Senghani',
      email: 'adarshco077@gmail.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}`,
      description: 'Development server',
    },
    {
      url: `http://localhost:${config.PORT}`,
      description: 'Production server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.route.ts'],
};

export default swaggerJSDoc(options);
