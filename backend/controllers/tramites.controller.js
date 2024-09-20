const BD = require('../database/config');
const { response, request } = require('express');



const getTramites = async (req = request, res = response)=>{

    const sql = 'SELECT * FROM TRAMITES';
    const tramites = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [], false);

        dbresponse.rows.map((data)=>{
            const tramite = {
                'ID_TRAMITE': data[0],
                'NOMBRE_TRAMITE': data[1],
                'DESCRIPCION_TRAMITE': data[2],
                'FECHA': data[3],
                'ESTADO': data[4] ? true: false,
            }
            tramites.push(tramite);
        });


        return res.json({
            OK:true,
            TRAMITES: tramites
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};

const getTramitesHabilitados = async (req = request, res = response)=>{
    const sql = 'SELECT * FROM TRAMITES WHERE ESTADO = 1';
    const tramites = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [], false);

        dbresponse.rows.map((data)=>{
            const tramite = {
                'ID_TRAMITE': data[0],
                'NOMBRE_TRAMITE': data[1]
            }
            tramites.push(tramite);
        });


        return res.json({
            OK:true,
            TRAMITES: tramites
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }
}

const agregaTramite = async (req = request, res = response)=>{
    const {NOMBRE_TRAMITE, DESCRIPCION_TRAMITE, FECHA} = req.body;

    const sql = "INSERT INTO TRAMITES (NOMBRE_TRAMITE, DESCRIPCION_TRAMITE, FECHA) VALUES (:NOMBRE_TRAMITE, :DESCRIPCION_TRAMITE, TO_DATE(:FECHA))";

    try {
        
        await BD.dbConnection(sql, [NOMBRE_TRAMITE, DESCRIPCION_TRAMITE, FECHA], true);

        return res.status(201).json({
            OK: true,
            NOMBRE_TRAMITE
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }
};

const eliminarTramite = async (req = request, res = response)=>{
    const ID_TRAMITE = req.header('id-tramite'); 

    const sql = 'DELETE FROM TRAMITES WHERE ID_TRAMITE = :ID_TRAMITE';

    try {

        let dbresponse = await BD.dbConnection(sql, [ID_TRAMITE], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'Este ID_TRAMITE no es válido'
            });
        }

        return res.status(200).json({
            OK: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }
}

const actualizarTramite = async (req = request, res = response)=>{
    const {ID_TRAMITE, NOMBRE_TRAMITE, DESCRIPCION_TRAMITE} = req.body

    const sql = 'UPDATE TRAMITES SET NOMBRE_TRAMITE = :NOMBRE_TRAMITE, DESCRIPCION_TRAMITE = :DESCRIPCION_TRAMITE WHERE ID_TRAMITE = :ID_TRAMITE';

    try {

        let dbresponse = await BD.dbConnection(sql, [NOMBRE_TRAMITE, DESCRIPCION_TRAMITE, ID_TRAMITE], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'Este ID_TRAMITE no es válido'
            });
        }

        return res.status(200).json({
            OK: true,
            NOMBRE_TRAMITE
        });


        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

}

const actualizarEstadoTramite = async (req = request, res = response)=>{
    const {ID_TRAMITE, ESTADO} = req.body;

    const sql = "UPDATE TRAMITES SET ESTADO = :ESTADO WHERE ID_TRAMITE = :ID_TRAMITE";

    try {

        let dbresponse = await BD.dbConnection(sql, [ESTADO , ID_TRAMITE], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'Este ID_TRAMITE no es válido'
            });
        }

        return res.status(200).json({
            OK: true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }
}


module.exports = {
    getTramites,
    agregaTramite,
    eliminarTramite,
    actualizarTramite,
    actualizarEstadoTramite,
    getTramitesHabilitados
}