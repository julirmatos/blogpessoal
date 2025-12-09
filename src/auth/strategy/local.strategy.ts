import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service"; 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private _usernameField: string;
    private _passwordField: string;

    constructor(private readonly authService: AuthService) {
        super(); 
        this._usernameField = 'usuario';
        this._passwordField = 'senha';
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password) // Pedimos que a validação seja feita

        if (!user) {    // Se a validação não passou, lance uma exceção
            throw new UnauthorizedException()
        }

        return user
    }
}