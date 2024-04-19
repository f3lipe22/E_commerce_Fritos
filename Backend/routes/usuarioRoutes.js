/*import express from "express";
const router = express.Router();
/*
router.get('/', (req, res) => {
    res.send("Desde API/USUARIOS");
});

router.post('/', (req, res) => {
    res.send("Desde API/USUARIOS");
});

import { registrar, autenticar, confirmar } from "../controller/usuarioController.js";

//Auntenticacion registro y confirmacion de usrs
router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);

export default router;
*/

import express from "express";
const router = express.Router();

import { 
    registrar, 
    autenticar, 
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
} from "../controller/usuarioController.js";

//Autenticacion y registro de usuario

router.post('/', registrar); //Crear nuevo usuario
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
/*
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);
*/
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

// router.get('/', (req, res) => {
//     res.send("Desde API/USUARIOS");
// });

// router.post('/', (req, res) => {
//     res.send("Desde API/USUARIOS");
// });

export default router;