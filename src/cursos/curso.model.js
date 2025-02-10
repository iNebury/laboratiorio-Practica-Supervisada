import { Schema, model } from "mongoose";

const cursoSchema = new Schema({
  nombreCurso: {
    type: String,
    required: [true, "El nombre del curso es obligatorio"],
    maxLength: [15, "El nombre no puede exceder los 15 caracteres"],
  },
  infoCurso: {
    type: String,
    required: [true, "Una descripcion es requerida"],
    maxLength: [50, "La descripcion no puede exceder los 50 caracteres"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  cradoPor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, 
{
  versionKey: false,
  timestamps: true,
});

export default model("Curso", cursoSchema);
