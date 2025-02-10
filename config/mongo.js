import mongoose from "mongoose"

export const dbconnection = async () => {
    try{
        console.log('error', () =>{
            console.log('MongoDB | No se puede conectar con MongoDB')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () =>{
            console.log('MongoDB | Conectando')
        })
        mongoose.connection.on('connected', () =>{
            console.log('MongoDB | Conectador a mongoDB')
        })
        mongoose.connection.on('open', () =>{
            console.log('MongoDB | Conectado a la Base de Datos')
        })
        mongoose.connection.on('reconnected', () =>{
            console.log('MongoDB | Reconectado con MongoDB')
        })
        mongoose.connection.on('disconnected', () =>{
            console.log('MongoDB | Desconectado de MongoDB')
        }) 

        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeOutMS: 5000,
            maxPoolSize: 50
        })
    }catch(err){
        console.log(`Fallo la conexion en la base de datos ${err}`)
    }
}