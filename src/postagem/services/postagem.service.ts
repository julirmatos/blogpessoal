/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable() // classe pode ser inserida em outras classes
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }

    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOneBy({ id });
        if (!postagem) {
            throw new HttpException('Postagem não Encontrada', HttpStatus.NOT_FOUND);
        }
        return postagem;
    }
}