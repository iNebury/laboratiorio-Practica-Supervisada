'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbconnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import cursoRoutes from "../src/cursos/curso.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"



const middlewares =(app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/sistemaDeEscuela/v1/auth", authRoutes);
    app.use("/sistemaDeEscuela/v1/user", userRoutes);
    app.use("/sistemaDeEscuela/v1/curso", cursoRoutes);
}

const ConnectDB = async () =>{
    try{
        await dbconnection()
    }catch(err){
        console.log(`Falló la conexion a la base de datos ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app)
        ConnectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Servidor ejecutandose en el puerto ${process.env.PORT}`)
    }catch(err){
        console.log(`server inti failed ${err}`)
    }
}