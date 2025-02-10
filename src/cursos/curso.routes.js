import { Router } from "express";
import {  verRolProfesor} from "../middlewares/curso-validator.js";
import {  crearCurso, eliminarCurso,  listarCursos, asignarCurso, cursosUsuario, buscarCursoPorEstudiante} from "./curso.controller.js";
import { getUserByIdValidator } from "../middlewares/user-validators.js";

const router = Router();

router.get("/", listarCursos);

router.post(  "/create",  verRolProfesor,  crearCurso);

router.delete(  "/delete/:uid",  verRolProfesor,   eliminarCurso);

router.patch("/asignCurse/:uid", asignarCurso);

router.get("/courseByUser/:uid", getUserByIdValidator, buscarCursoPorEstudiante);

export default router;
