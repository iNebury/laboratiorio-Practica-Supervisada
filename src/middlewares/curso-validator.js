import User from "../user/user.model.js";
import Curso from "../cursos/curso.model.js";

export const verRolProfesor = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "El id del usuario es necesario" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    if (user.role !== "TEACHER_ROLE") {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado, solo profesores pueden realizar esta accion",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error en la autenticacion",
      error: err.message,
    });
  }
};