import { Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-docs.json';
import schemas from './dbs/mongodb/mongoose.swagger';

export const initSwagger = (app: Express) => {
    // @ts-ignore
    swaggerDocument.swaggerDefinition.components.schemas = schemas;
    const swaggerOptions = {
        customCssUrl: '/swagger.css',
    };

    const swaggerDocs = swaggerJsDoc(swaggerDocument);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerOptions));
};
