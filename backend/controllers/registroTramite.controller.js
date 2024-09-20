const BD = require('../database/config');
const { response, request } = require('express');


// ADD REGISTRO TRAMITE

const agregarRegistroTramite = async (req = request, res = response) => {

    const { CEDULA_CLIENTE, ID_TRAMITE, DESCRIPCION, HORA, FECHA, CEDULA_USUARIO, ID_AREA } = req.body;
    const FECHA_Y_HORA = FECHA + ' ' + HORA;

    const sql = "INSERT INTO REGISTRO_TRAMITE (CEDULA_CLIENTE, ID_TRAMITE, DESCRIPCION, FECHA_Y_HORA, CEDULA_USUARIO, ID_AREA) VALUES (:CEDULA_CLIENTE, :ID_TRAMITE, :DESCRIPCION, TO_DATE(:FECHA_Y_HORA, 'DD/MM/YYYY HH24:MI:SS'), :CEDULA_USUARIO, :ID_AREA)";

    try {

        await BD.dbConnection(sql, [CEDULA_CLIENTE, ID_TRAMITE, DESCRIPCION, FECHA_Y_HORA, CEDULA_USUARIO, ID_AREA ], true);

        return res.status(201).json({
            OK: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};

module.exports = {
    agregarRegistroTramite
}