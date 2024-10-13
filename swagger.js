const swaggerAutogen = require('swagger-autogen')();

const doc = {
    securitySchemes:{
        OAuth2: {
            type: 'oauth2',
            description: 'This is a test',
            flows: {
                implicit: {
                    authorizationUrl: 'http://localhost:8080/oauth/authorize',
                    scopes: {
                        read: 'Grants read access',
                        write: 'Grants write access',
                        admin: 'Grants access to admin operations'
                    }
                }
            }
        }
    },
    info: {
        title: 'My API',
        description: 'Sports API'
    },
    host: 'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger.json';
const routes = ['./routers/index.js']; /* NOTE: If you are using the express Router, you must pass in the 'routes' only the root file where the route starts, such as index.js, app.js, routes.js, etc ... */

// Generate swagger.json
swaggerAutogen(outputFile, routes, doc);