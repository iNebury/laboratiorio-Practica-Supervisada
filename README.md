# API Sistema de Escuela

Este documento describe los endpoints de la API para el sistema de escuela.
Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```
## Endpoints

### Registrar Usuario
- **URL**: `/sistemaDeEscuela/v1/auth/register`
- **Método**: `POST`
- **Descripción**: Este endpoint permite registrar un nuevo usuario en el sistema.

#### Cuerpo de la solicitud (JSON)
```json
{
  "nombre": "Diego",
  "apellido": "Urias",
  "email": "inebury2005@gmail.com",
  "username": "durias2005",
  "password": "1N3bury"
}
Respuestas Esperadas:
200 OK: Registro exitoso.
400 Bad Request: Información de usuario inválida.
409 Conflict: El email o el username ya están en uso.
Respuesta Exitosa:
json
Copiar
Editar
{
  "success": true,
  "message": "Usuario registrado exitosamente"
}
Respuesta de Error:
json
Copiar
Editar
{
  "success": false,
  "message": "El email ya está registrado"
}
-Restricciones y Validaciones:
Validaciones de Contraseña:
Al menos 8 caracteres.
Contener al menos una letra mayúscula.
Incluir al menos un número.
Tener al menos un carácter especial.
Correos y Usernames Únicos: Se valida que el email y el username no existan en la base de datos antes del registro.
Inicio de Sesión
URL: /sistemaDeEscuela/v1/auth/login
Método: GET
Descripción: Este endpoint permite iniciar sesión en el sistema.
Cuerpo de la solicitud (No especificado, pero se sugiere enviar email y password).
Respuestas Esperadas:
200 OK: Inicio de sesión exitoso.
401 Unauthorized: Credenciales inválidas.
Ejemplo de Uso
Registrar Usuario
bash
Copiar
Editar
curl -X POST http://127.0.0.1:3001/sistemaDeEscuela/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Diego",
  "apellido": "Urias",
  "email": "inebury2005@gmail.com",
  "username": "durias2005",
  "password": "1N3bury"
}'
Respuesta Exitosa:
json
Copiar
Editar
{
  "success": true,
  "message": "Usuario registrado exitosamente"
}
Respuesta de Error:
json
Copiar
Editar
{
  "success": false,
  "message": "El email ya está registrado"
}
Iniciar Sesión
bash
Copiar
Editar
curl -X GET http://127.0.0.1:3001/sistemaDeEscuela/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "inebury2005@gmail.com",
  "password": "1N3bury"
}'
Respuesta Exitosa:
json
Copiar
Editar
{
  "success": true,
  "message": "Inicio de sesión exitoso"
}
Respuesta de Error:
json
Copiar
Editar
{
  "success": false,
  "message": "Credenciales inválidas"
}
Descripción General
Respuestas Esperadas:
200 OK: Se indica que la operación (registro o inicio de sesión) fue exitosa.
400 Bad Request: El cuerpo de la solicitud contiene información inválida.
401 Unauthorized: Las credenciales proporcionadas (email y contraseña) son incorrectas.
409 Conflict: El email o el username ya están en uso durante el registro.
