import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { borrarArchivoEnError } from "./borrar-archivo-en-error.js";
import { manejoErrores } from "./manejo-errores.js";

export const registerValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password"),
    validarCampos,
    borrarArchivoEnError,
    manejoErrores
]

export const loginValidator = [
    body("nombre").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    manejoErrores
]

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    manejoErrores
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    manejoErrores
]

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    manejoErrores
]

export const updateUserValidator = [
    param("uid", "No es un ID válido").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    manejoErrores
]




