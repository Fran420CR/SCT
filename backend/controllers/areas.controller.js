const BD = require('../database/config');
const { response, request } = require('express');


const getAreas = async (req = request, res = response)=>{

    const sql = 'SELECT * FROM AREAS';
    const areas = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [], false);

        dbresponse.rows.map((data)=>{
            const area = {}
            dbresponse.metaData.map(({name}, index)=>{
                area[name] = data[index];
            })
            areas.push(area);
        });


        return res.json({
            OK:true,
            AREAS: areas
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};

const getAreasPorUsuario = async (req = request, res = response)=>{


    const CEDULA_USUARIO = req.header('cedula-usuario');
    const sql = 'SELECT ID_AREA, NOMBRE_AREA FROM AREAS_POR_USUARIO WHERE CEDULA_USUARIO = :CEDULA_USUARIO';
    const areas = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [CEDULA_USUARIO], false);

        if(dbresponse.rows.length === 0){
            return res.status(404).json({
                OK: false,
                MSG: 'No se encontró ningún área registrada con el nombre proporcionada'
            });
        }

        dbresponse.rows.map((data)=>{
            const area = {}
            dbresponse.metaData.map(({name}, index)=>{
                area[name] = data[index];
            })
            areas.push(area);
        });

        return res.json({
            OK:true,
            AREAS: areas
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};

const agregarArea = async (req = request, res = response)=>{
    const {NOMBRE_AREA, DESCRIPCION_AREA, FECHA} = req.body;


    const sql = "INSERT INTO AREAS (NOMBRE_AREA, DESCRIPCION_AREA, FECHA) VALUES (:NOMBRE_AREA, :DESCRIPCION_AREA, TO_DATE(:FECHA))";


    try {

        await BD.dbConnection(sql, [NOMBRE_AREA, DESCRIPCION_AREA, FECHA], true);

        return res.status(201).json({
            OK: true,
            NOMBRE_AREA
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }
}

const eliminarArea = async (req = request, res = response)=>{
    const ID_AREA = req.header('id-area');

    const sql = 'DELETE FROM AREAS WHERE ID_AREA = :ID_AREA';

    try {

        let dbresponse = await BD.dbConnection(sql, [ID_AREA], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'Este ID_AREA no es válido'
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

const actualizarArea = async (req = request, res = response)=>{
    const {ID_AREA, NOMBRE_AREA, DESCRIPCION_AREA} = req.body

    const sql = 'UPDATE AREAS SET NOMBRE_AREA = :NOMBRE_AREA, DESCRIPCION_AREA = :DESCRIPCION_AREA WHERE ID_AREA = :ID_AREA';

    try {

        let dbresponse = await BD.dbConnection(sql, [NOMBRE_AREA, DESCRIPCION_AREA, ID_AREA], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'Este ID_AREA no es válido'
            });
        }

        return res.status(200).json({
            OK: true,
            NOMBRE_AREA
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
    agregarArea,
    eliminarArea,
    actualizarArea,
    getAreas,
    getAreasPorUsuario
}