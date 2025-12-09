import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt.ts/bcrypt";

@Module({
    imports: [],
    providers: [Bcrypt],
    controllers: [],
    exports: [Bcrypt],
})
export class AuthModule {};