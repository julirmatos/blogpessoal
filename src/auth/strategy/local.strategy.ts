import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service"; 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

        constructor(private authService: AuthService) { // Iniciamos o método construtor
        super({
            usernameField: 'usuario',// usernameField é o campo que vem da PassportStrategy e indicamos quem ele se refere na nossa validação = usuario
            passwordField: 'senha'  // passwordField é o campo que vem da PassportStrategy e indicamos quem ele se refere na nossa validação = senha
        });
    }


    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password) // Pedimos que a validação seja feita

        if (!user) {    // Se a validação não passou, lance uma exceção
            throw new UnauthorizedException()
        }

        return user
    }
}