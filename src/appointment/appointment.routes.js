import { Router } from "express";
import { saveAppointment , getAppointment ,updateAppointment,cancelarCita} from "./appointment.controller.js";
import { createAppointmentValidator, updateAppointmentValidator , cancelApointmentValidator} from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/getAppointment/", getAppointment);

router.patch("/updateAppointment/:uid", updateAppointmentValidator, updateAppointment);

router.patch("/cancelAppointment/:uid", cancelApointmentValidator, cancelarCita);


export default router;