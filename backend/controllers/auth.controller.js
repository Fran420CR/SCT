const BD = require('../database/config');
const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {
    const { CEDULA, NOMBRE, APELLIDO_1, APELLIDO_2, FECHA_NAC } = req.body;
    let { CONTRASENA } = req.body

    const sql = 'INSERT INTO USUARIOS VALUES (:CEDULA, :CONTRASENA, :NOMBRE, :APELLIDO_1, :APELLIDO_2, :FECHA_NAC)';

    try {
        //Encriptar la contraseña
        const salt = await bcrypt.genSalt();
        CONTRASENA = await bcrypt.hash(CONTRASENA, salt);

        // Genera un TOKEN
        const TOKEN = await generarJWT(CEDULA, NOMBRE);

        //Agregar a la base de datos
        await BD.dbConnection(sql, [CEDULA, CONTRASENA, NOMBRE, APELLIDO_1, APELLIDO_2, FECHA_NAC], true);


        // Genera Respuesta exitosa
        return res.status(201).json({
            OK: true,
            CEDULA,
            NOMBRE,
            APELLIDO_1,
            APELLIDO_2,
            TOKEN
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

}

const loginUsuario = async (req = request, res = response) => {

    const { CEDULA, CONTRASENA } = req.body;

    const sql = 'SELECT CEDULA, CONTRASENA, NOMBRE, APELLIDO_1, APELLIDO_2 FROM USUARIOS WHERE CEDULA = :CEDULA';
    const sqlRoles = 'SELECT NOMBRE_ROL FROM USUARIOS_ROLES WHERE CEDULA_USUARIO = :CEDULA';

    try {

        // Buscamos al usuario en la base de datos
        let dbResponse = await BD.dbConnection(sql, [CEDULA], false);
        let usuario = dbResponse.rows.map(usuarioData => {
            return schema = {
                'CEDULA': usuarioData[0],
                'CONTRASENA': usuarioData[1],
                'NOMBRE': usuarioData[2],
                'APELLIDO_1': usuarioData[3],
                'APELLIDO_2': usuarioData[4]
            }
        })[0];


        if (!usuario) {
            return res.status(400).json({
                OK: false,
                MSG: 'Credenciales inválidas'
            });
        }

        // Confirmar su la contrasena hace match
        const contrasenaValida = await bcrypt.compare(CONTRASENA, usuario.CONTRASENA);
        if (!contrasenaValida) {
            return res.status(400).json({
                OK: false,
                MSG: 'Credenciales inválidas'
            });
        }

        //Cargar roles del usuario
        dbResponse = await BD.dbConnection(sqlRoles, [CEDULA], false);

        let roles = dbResponse.rows.map(rolesData => {
            return rolesData[0];
        }).flat();



        // Generar un JWT
        const TOKEN = await generarJWT(CEDULA, usuario.NOMBRE);

        return res.status(201).json({
            OK: true,
            CEDULA: usuario.CEDULA,
            NOMBRE: usuario.NOMBRE,
            APELLIDO_1: usuario.APELLIDO_1,
            APELLIDO_2: usuario.APELLIDO_2,
            ROL: roles,
            TOKEN
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

}

const validarUsuario = async (req = request, res = response) => {

    const { CEDULA, NOMBRE } = req;
    const sql = "SELECT APELLIDO_1, APELLIDO_2 FROM USUARIOS WHERE NOMBRE = :NOMBRE AND CEDULA = :CEDULA"
    const sqlRoles = 'SELECT NOMBRE_ROL FROM USUARIOS_ROLES WHERE CEDULA_USUARIO = :CEDULA';


    // Buscamos al usuario en la base de datos
    let dbResponse = await BD.dbConnection(sql, [NOMBRE, CEDULA], false);

    let usuario = dbResponse.rows.map(usuarioData => {
        return schema = {
            'APELLIDO_1': usuarioData[0],
            'APELLIDO_2': usuarioData[1],
            'ROL': usuarioData[2]
        }
    })[0];

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Error con el Usuario'
        });
    }

    //Cargar roles del usuario
    dbResponse = await BD.dbConnection(sqlRoles, [CEDULA], false);

    let roles = dbResponse.rows.map(rolesData => {
        return rolesData[0];
    }).flat();

    return res.status(200).json({
        OK: true,
        CEDULA,
        NOMBRE,
        APELLIDO_1: usuario.APELLIDO_1,
        APELLIDO_2: usuario.APELLIDO_2,
        ROL: roles,
    });

}


module.exports = {
    crearUsuario,
    loginUsuario,
    validarUsuario
}