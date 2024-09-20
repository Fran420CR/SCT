const { response, request } = require("express");
const jwt = require('jsonwebtoken')


const validarJWT = (req=request, res=response, next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {

        const {cedula, nombre} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        req.CEDULA = cedula;
        req.NOMBRE = nombre;
        
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }


    //TODO OK
    next();

};

module.exports = {
    validarJWT
}