import Curso from "./curso.model.js";
import Usuario from "../user/user.model.js";

export const listarCursos= async (req, res) => {
  try {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    const [total, cursos] = await Promise.all([
      Curso.countDocuments(query),
      Curso.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);

    return res.status(200).json({ success: true, total, cursos });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al listar",
      error: err.message,
    });
  }
};



export const crearCurso = async (req, res) => {
  try {
    const { nombreCurso, infoCurso, capacidadCurso } = req.body;
    const userId = req.user._id;

    if (!nombreCurso || !infoCurso || !capacidadCurso) {
      return res.status(400).json({
        success: false,
        message: "Informacion pendiente",
      });
    }

    const nuevoCurso = new Curso({nombreCurso, infoCurso, capacidadCurso, status: true, cradoPor: userId,  });
    await nuevoCurso.save();
    return res.status(201).json({ success: true, message: "Curso creado exitosamente", curso: nuevoCurso, });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al crear el curso",
      error: err.message,
    });
  }
};

export const eliminarCurso = async (req, res) => {
  try {
    const { uid } = req.params;
    const userId = req.user._id; 
    const curso = await Curso.findById(uid);

    if (!curso) {
      return res.status(404).json({ success: false, message: "Curso no encontrado" });
    }
    if (curso.cradoPor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado, solo el creador del curso puede eliminarlo",
      });
    }

    //Parte para desagsinar a los alumnos del curso
    const estudiantes = await Usuario.find({ cursos: uid });
    for (const estudiante of estudiantes) {
      estudiante.cursos = estudiante.cursos.filter(cursoId => cursoId.toString() !== uid.toString());
      await estudiante.save();
    }
    curso.status = false; 
    await curso.save();
    return res.status(200).json({ success: true, message: "Curso eliminado correctamente, estudiantes desasignados", curso });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el curso",
      error: err.message,
    });
  }
};

export const asignarCurso = async (req, res) => {
  try {
    const { uid } = req.params;
    const { userId } = req.body;

    const curso = await Curso.findById(uid);
    if (!curso || curso.status === false) {
      return res.status(404).json({ success: false, message: "Curso no encontrado" });
    }

    const usuario = await Usuario.findById(userId);
    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    if (!usuario.role) {
      return res.status(400).json({ success: false, message: "El usuario no tiene un rol definido" });
    }

    if (usuario.role !== "STUDENT_ROLE") {
      return res.status(403).json({ success: false, message: "Solo los estudiantes pueden asignarse a cursos" });
    }

    if (usuario.cursos.includes(uid)) {
      return res.status(400).json({ success: false, message: "El usuario ya tiene asignado este curso" });
    }

    if (usuario.cursos.length >= 3) {
      return res.status(400).json({ success: false, message: "El usuario ya tiene asignado el maximo de cursos permitidos" });
    }

    usuario.cursos.push(uid);
    await usuario.save();

    return res.status(200).json({ success: true, message: "Curso asignado correctamente", usuario });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al asignar el curso",
      error: err.message,
    });
  }
};

export const buscarCursoPorEstudiante = async (req, res) => {
  try {
    const { uid } = req.params;
    const usuario = await Usuario.findById(uid).populate("cursos");

    if (!uid) {
      return res.status(400).json({ success: false, message: "El userId es necesario", });
    }

    if (!usuario) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    return res.status(200).json({ success: true, cursos: usuario.cursos });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al buscar el curso del estudiante",
      error: err.message,
    });
  }
}