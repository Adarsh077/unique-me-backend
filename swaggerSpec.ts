import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import config from './config';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Backend Api doc for Unique Me',
    version: '0.0.1-alpha',
    description: `Unique Me is a platform where anyone can check the availability of a username across multiple social media platforms or domain names with just one click.
    
    ## Local Installation

    git clone https://github.com/Adarsh077/unique-me-backend.git
    cd unique-me-backend
    npm i
    npm run dev

    
    `,
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
      url: config.PROD_BASE_URL,
      description: 'Production server (Disabled)',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.route.ts'],
};

export default swaggerJSDoc(options);
