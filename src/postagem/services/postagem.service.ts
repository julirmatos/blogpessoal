/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';
import { TemaService } from "./services/tema.service";

@Injectable() // classe pode ser inserida em outras classes
export class PostagemService {
    [x: string]: any;
     constructor(
        @InjectRepository(Postagem) // Aplica a inversão de dependência a nossa classe Repository
        private postagemRepository: Repository<Postagem>,    // Criamos um Objeto da classe Repository voltado para Postagens
        private temaService: TemaService                    // Dentro do Construtor injetamos o temaService para podermos usar seus métodos 
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {    // Indica que queremos trazer também o relacionamento
                tema: true
            }
        })
    }

    async findById(id: number): Promise<Postagem> {
        // Verifica primeiro se a postagem existe
        const postagem = await this.postagemRepository.findOne({
            where: { id },
            relations: {    // Indica que queremos trazer também o relacionamento
                tema: true
            }
        })

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
        }

        // Se a postagem foi encontrada, retorna ela
        return postagem
    }
    async findByTitulo(titulo: string): Promise<Postagem[]> {
        // Verifica se existi postagem com o parametro informado
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {    // Indica que queremos trazer também o relacionamento
                tema: true
            }
        })
    }
    async createPostagem(postagem: Postagem): Promise<Postagem> {
        /*
            {
                "id": 1
                "titulo": "",
                "texto": "Texto da Postagem 3",
                "tema": {
                    "id": 1
                }
            }
        */

        if (postagem.tema) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

        }

        return await this.postagemRepository.save(postagem);
    }


    async updatePostagem(postagem: Postagem): Promise<Postagem> {
        /*
            {
                "id": 1
                "titulo": "",
                "texto": "Texto da Postagem 3",
                "tema": {
                    "id": 1
                }
            }
        */

        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(postagem.id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem || !postagem.id) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        if (postagem.tema) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

        }

        // Se a postagem foi encontrada, cadastra ela no BD e retorna ela
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        // Se a postagem foi encontrada, apaga ela no BD e retorna uma confirmação de exclusão
        return await this.postagemRepository.delete(id);

    }
   

}