import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";


// const registrar = async (req, res) => {
//     //evitar registros duplicados
//     const { email } = req.body;
//     const existeUsuario = await Usuario.findOne ({ email });

//     if (existeUsuario){
//         const error = new Error("Usuario Ya registrado");
//         return res.status(400).json({ msg:error.message })
//     }

//     try{
//         const usuario = new Usuario(req.body);
//         usuario.token = generarId();
//         const usuarioAlmacenado = await usuario.save();
//         res.json(usuarioAlmacenado);        
//     }catch(error){
//         console.log(error);
//     }
// };

const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email });
  
    if (existeUsuario) {
      const error = new Error("Usuario ya registrado");
      return res.status(400).json({ msg:error.message })
    }
  
    try {
      const usuario = new Usuario(req.body);
      usuario.token = generarId();
      const usuarioAlmacenado = await usuario.save();
      
      // Usuario registrado exitosamente, envía un mensaje de éxito
      const error = new Error("Usuario Registrado Correctamente");
      return res.status(201).json({ msg:error.message })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Hubo un error al registrar el usuario" });
    }
  };

  
const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //comprobar si el usuario usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario){
        const error = new Error("El usr no existe");
        return res.status(404).json({ msg: error.message });
    }

    //comprobar si el usr esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }
    
    //confirmar el password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
            msg: "Inicio de sesión exitoso",
        })
    } else{
        const error = new Error("Password Incorrecto");
        return res.status(403).json({ msg: error.message });
    }
    
};

const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioCofirmar = await Usuario.findOne({ token });
    if (!usuarioCofirmar){
        const error = new Error("Token no valido");
        return res.status(403).json({ msg: error.message });
    }
    try {
        usuarioCofirmar.confirmado = true;
        usuarioCofirmar.token = "";
        await usuarioCofirmar.save();
        res.json({ msg: "Usuario Confirmado Correctamente" });

    } catch (error) {

    }
};

const olvidePassword = async (req, res) => {
    const {email} = req.body;
    const usuario = await Usuario.findOne({ email });
    if(!usuario) {
        const error = new Error("El usr no existe");
        return res.status(404).json({ msg: error.message});
    }

    try {
        usuario.token = generarId();
        await usuario.save();
        res.json({ msg: "Hemso enviado un imeil con las instrucciones" });
    } catch (error) {
        console.log(error);
        
    }

};

const comprobarToken = async (req, res) =>{
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });

    if(tokenValido){
        res.json({ msg:"Touken valido y el usr si existe" });
    }else{
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message});
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if(usuario){
        usuario.password = password;
        usuario.token= "";
        try {
            await usuario.save();
            res.json({ msg: "Password Mod niceMente"});
        } catch (error) {
            console.log(error)
            
        }
    }else{
        const error = new Error("Token no valido");
        return res.status(404).json({ msg: error.message});
    }
}

export { registrar, 
        autenticar, 
        confirmar, 
        olvidePassword, 
        comprobarToken,
        nuevoPassword 
};