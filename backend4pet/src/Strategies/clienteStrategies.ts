import { AuthenticationStrategy } from "@loopback/authentication";
import { HttpErrors, RedirectRoute } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { Request } from 'express';
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { service } from "@loopback/core";
import { AutenticacionService } from "../services";

export class EstrategiaAdmin implements AuthenticationStrategy {
    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ) { }

    name: string = 'Cliente';

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request)
        if (token) {
            let datos = this.servicioAutenticacion.ValidarToken(token)
            if (datos) {
                let perfil: UserProfile = Object.assign({
                    rol: datos.data.rol
                });
                return perfil

            } else {
                throw new HttpErrors[401]('Token invalido')

            }

        } else {

        }
        throw new HttpErrors[401]('No incluye token')
    }

}