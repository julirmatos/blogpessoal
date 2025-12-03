/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable() // classe pode ser inserida em outras classes
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {
                tema: true
            }
        });
    }

    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true
            }
        });

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        });
    }

    async createPostagem(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
    }

    async updatePostagem(postagem: Postagem): Promise<Postagem> {
        await this.findById(postagem.id);
        return await this.postagemRepository.save(postagem);
    }

    async deletePostagem(id: number): Promise<DeleteResult> {
        await this.findById(id);
        return await this.postagemRepository.delete(id);
    }
}