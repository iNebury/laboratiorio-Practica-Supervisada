import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    fotoDePerfil:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
        default: 'STUDENT_ROLE'
    },
    estado:{
        type: Boolean,
        default: true
    },
    cursos:[{
        type: Schema.Types.ObjectId,
        ref: 'Curso'
    }]

},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

export default model('User', userSchema);