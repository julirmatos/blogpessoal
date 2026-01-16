import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact("Daniel Almeida Andrade", "https://github.com/Dan2a", "dan.andrade313@gmail.com")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
<<<<<<< HEAD
  SwaggerModule.setup('/swagger', app, document);
=======
  SwaggerModule.setup('/Blog-Pessoal-Juliana', app, document); // SwaggerModule.setup('/Blog-pessoalJuliana', app, document);
>>>>>>> parent of 34353c9 (ajustes  de deploy)

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
