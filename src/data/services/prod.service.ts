import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL, // Variável gerada automaticamente pelo Render
      logging: false,
      dropSchema: false,
      ssl: {
        rejectUnauthorized: false, // Necessário para contornar restrições de certificado no Render
      },
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}