import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { mailService } from 'src/mail/mails.service';
import { SqlService } from 'src/sql/sql.service';
import * as jwt from 'jsonwebtoken';

import { cambio_contra } from 'src/usuarios/cambio_contra/cambiocontra';
import { CambioContraService } from 'src/usuarios/cambio_contra/cambio_contra.service';
@Controller('mailer')
export class MailerController {
  constructor(private sendemail: mailService, readonly sql: SqlService, private cambio: CambioContraService) { }
  private readonly secretKey = process.env.Key_Key
  @Get("reset/:id")
  async test(@Param('id') id: string) {
    const usuario = await this.sql.query('select id_user,email from inst.usuario where id_user = $1', [id])
    if (usuario[0].email) {
      const token = await jwt.sign({ usuario }, this.secretKey, { expiresIn: '5m' });
      this.sql.query('UPDATE inst.usuario SET reseteo = $1  WHERE id_user = $2;', [token, id])
      this.sendemail.sendEmail(usuario[0].email, "recuperar contraseña", `
       
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            font-size: 24px;
            color: #4CAF50;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
          }
          .content p {
            margin: 15px 0;
          }
          .content a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
          }
        </style>
      </head>
      <body>
  
        <div class="container">
          <div class="header">
            <h1>Recupera tu contraseña</h1>
          </div>
  
          <div class="content">
            <p>¡Hola!</p>
            <p>Recibimos una solicitud para restablecer tu contraseña. Si fuiste tú, haz clic en el siguiente botón para restablecerla:</p>
            
            <a href="http://localhost:4200/#/restablecer/${token}" target="_blank">Restablecer Contraseña</a>
  
            <p>Si no realizaste esta solicitud, por favor ignora este mensaje. Tu contraseña no ha sido modificada.</p>
  
            <p>Saludos,</p>
            <p>El equipo de TuAplicacion</p>
          </div>
        </div>
  
      </body>
      </html>
      
      
      `)
      return { message: "verifique la bandeja de entrada o el spam" }
    } else {
      return { message: "el usuario no tiene correo " }

    }
  }

  @Get("restablecer/:id")
  async restablecer(@Param('id') id: string) {
    return await this.sql.query("select id_user from inst.usuario where reseteo =$1 ", [id])
  }
  @Post("restablecer/:id")
  async confirmar_restablecer(@Param('id') id: string, @Body() datos: cambio_contra) {
    try {
      const decoded = jwt.verify(id, this.secretKey);
      if (decoded.usuario[0].id_user) {
        return await this.cambio.Contra(decoded.usuario[0].id_user, datos.contra)
      }
    } catch (error) {
      return { error: "el token ha caducado" }
    }
  }

}



