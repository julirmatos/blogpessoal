import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL, // Variável que o Render fornece
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false, // Necessário para conexões seguras no Render
      },
      synchronize: true, // Em produção real, recomenda-se usar migrations, mas para testes pode manter true
      autoLoadEntities: true,
    };
  }
}