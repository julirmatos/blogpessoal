/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
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
    @Get('/:id') // buscar postagem por id
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo') // buscar postagem por titulo
    @HttpCode(HttpStatus.OK)
    findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.postagemService.findAllByTitulo(titulo);
    }

    @Post() // criar uma nova postagem
    @HttpCode(HttpStatus.CREATED)
    createPostagem(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.createPostagem(postagem);
    }

    @Put() // atualizar uma postagem
    @HttpCode(HttpStatus.OK)
    updatePostagem(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.updatePostagem(postagem);
    }

    @Delete('/:id') // deletar uma postagem
    @HttpCode(HttpStatus.NO_CONTENT)
    deletePostagem(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.postagemService.deletePostagem(id);
    }
}

