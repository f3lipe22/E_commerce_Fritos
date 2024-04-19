import express from "express";
const router = express.Router();

import { 
    registrar, 
    autenticar, 
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
} from "../controller/adminController.js";

//Autenticacion y registro de usuario

router.post('/', registrar); //Crear nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

export default router;