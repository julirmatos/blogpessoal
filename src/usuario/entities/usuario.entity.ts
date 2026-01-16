import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional } from "class-validator" // Adicionado IsString e IsOptional
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Postagem } from "../../postagem/entities/postagem.entity"

@Entity({name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    @ApiProperty() 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"}) 
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({length: 255, nullable: false }) 
    @ApiProperty() 
    senha: string

    @IsString()      // Adicionado: valida que o conteúdo é uma string
    @IsOptional()    // Adicionado: permite que o campo seja enviado ou não no JSON
    @Column({length: 5000, nullable: true }) // Adicionado nullable para consistência
    @ApiProperty() 
    foto: string

    @ApiProperty({ type: () => Postagem, isArray: true }) 
    @OneToMany(() => Postagem, (postagem) => postagem.usuario)
    postagem: Postagem[]

}