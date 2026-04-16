"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const audit_interceptor_1 = require("./common/interceptors/audit.interceptor");
const prisma_service_1 = require("./prisma/prisma.service");
async function bootstrap() {
    dotenv.config();
    dotenv.config({ path: 'apps/backend/.env' });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const prismaService = app.get(prisma_service_1.PrismaService);
    app.useGlobalInterceptors(new audit_interceptor_1.AuditInterceptor(prismaService));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LMS SMK API')
        .setDescription('The LMS SMK API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT
        ? Number(process.env.PORT)
        : process.env.PORT_BACKEND
            ? Number(process.env.PORT_BACKEND)
            : 3001;
    await app.listen(port);
    console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map