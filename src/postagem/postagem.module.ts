/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controller/postagem.controller";
import { PostagemService } from "./services/postagem.service";
import { TemaService } from "../tema/services/tema.service"; // import { TemaService } from "../tema/services/tema.service";
import { TemaModule } from "../tema/tema.module";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    controllers: [PostagemController],
    providers: [PostagemService, TemaService],
    exports: [TypeOrmModule]
})


@Module({
    imports: [TypeOrmModule.forFeature([Postagem]) ],
    providers: [PostagemService],
    controllers: [PostagemController],
    exports: [],
})
export class PostagemModule { }
