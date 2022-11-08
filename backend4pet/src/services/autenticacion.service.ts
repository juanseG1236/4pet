import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../Config/Llaves';
import { Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
const generador = require('password-generator');
const cryptoJS = require('crypto-js') 
const jwt = require('jsonwebtoken');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository : UsuarioRepository
  ) {}

  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  
  };
  CifrarClave(clave:string){
    let ClaveCifrada = cryptoJS.MD5(clave).toString();
    return ClaveCifrada;
  }

  IdentificarPersona(UsuarioC : string, Clave : string){

    try{
      let p = this.usuarioRepository.findOne({where: {correo : UsuarioC, contrasena : Clave}})
      if(p){
        return p
      }
      return false
    }catch{
      return false
    }

        
  }

  GenerarTokenJWT(usuario : Usuario){
    let token = jwt.sign({
      data: {
        rol : usuario.rol,
        usuario : usuario.correo
      }

    },
      Llaves.ClaveJWT);
      return token
  }

  ValidarToken(Token : string){
    try{
      let datos = jwt.Verify(Token,Llaves.ClaveJWT)
      return datos
    } catch{
      return false
    }
  }
}
