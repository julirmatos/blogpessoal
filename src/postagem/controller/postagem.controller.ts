/* eslint-disable prettier/prettier */
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';

@Controller('/postagens')
export class PostagemController {
    constructor(private readonly postagemService: PostagemService) { }

    @Get()//decorator método get - buscar postagem
    @HttpCode(HttpStatus.OK) //define status code para respostas
    findAll(): Promise<Postagem[]> {
        return this.postagemService.findAll();
    }
}

