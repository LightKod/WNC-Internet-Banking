import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerConfig.js';

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs };
