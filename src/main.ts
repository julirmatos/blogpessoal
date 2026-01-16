import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Generation Brasil", "http://www.generationbrasil.online", "generation@email.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document); // SwaggerModule.setup('/Blog-pessoalJuliana', app, document);

  // Configuração do fuso horário
  process.env.TZ = '-03:00';

  // Pipes de validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Habilita o CORS para permitir requisições do Front-end
  app.enableCors();

  // O Render define automaticamente a variável PORT. 
  // Usar 0.0.0.0 como host é uma boa prática em deploys Docker/Cloud para garantir acessibilidade externa.
  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Aplicação rodando na porta: ${port}`);
}

bootstrap();