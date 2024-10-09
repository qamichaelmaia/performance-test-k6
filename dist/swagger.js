"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSetupOptions = exports.swaggerDocumentOptions = exports.swaggerPath = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerPath = "api";
exports.swaggerDocumentOptions = new swagger_1.DocumentBuilder()
    .setTitle("EBAC Demo Store")
    .setDescription('Observe que todos os endpoints são protegidos com autenticação JWT.')
    .setVersion("4kuvflfu")
    .addBearerAuth()
    .build();
exports.swaggerSetupOptions = {
    swaggerOptions: {
        persistAuthorization: true,
    },
    customCssUrl: "../swagger/swagger.css",
    customfavIcon: "../swagger/favicon.png",
    customSiteTitle: "EBAC Demo Store",
};
//# sourceMappingURL=swagger.js.map