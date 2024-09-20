const BD = require('../database/config');
const { response, request } = require('express');



const getTramitesAsociados = async (req = request, res = response)=>{

    let sql = 'SELECT T.ID_TRAMITE, T.NOMBRE_TRAMITE FROM TRAMITES T INNER JOIN TRAMITES_AREAS TA ON T.ID_TRAMITE = TA.ID_TRAMITE WHERE TA.ID_AREA = :ID_AREA';
    const LISTA_TRAMITES_ASOCIADOS = [];
    
    const ID_AREA = req.header('id-area');
    const habilitados = req.header('habilitados');

    if(habilitados != -1){
        sql += ' AND T.ESTADO = ' + (habilitados == 1 ? 1 : 0);
    }
    
    try {

        let dbresponse = await BD.dbConnection(sql, [ID_AREA], false);

        dbresponse.rows.map(data=>{
            LISTA_TRAMITES_ASOCIADOS.push({
                ID_TRAMITE: data[0],
                NOMBRE_TRAMITE: data[1]
            });
        })

        res.status(200).json({
            OK: true,
            LISTA_TRAMITES_ASOCIADOS
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};

const getNotTramitesNoAsociados = async (req = request, res = response)=>{

    const ID_AREA = req.header('id-area');

    const sql = 'SELECT T.ID_TRAMITE, NOMBRE_TRAMITE FROM TRAMITES T WHERE T.ID_TRAMITE NOT IN (SELECT TA.ID_TRAMITE FROM TRAMITES_AREAS TA WHERE TA.ID_AREA = :ID_AREA )';

    const LISTA_TRAMITES_NO_ASOCIADOS = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [ID_AREA], false);

        dbresponse.rows.map(data=>{
            LISTA_TRAMITES_NO_ASOCIADOS.push({
                ID_TRAMITE: data[0],
                NOMBRE_TRAMITE: data[1]
            });
        })

        res.status(200).json({
            OK: true,
            LISTA_TRAMITES_NO_ASOCIADOS
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};


const asociarTramiteArea = async (req = request, res = response)=>{
    const {ID_AREA, ID_TRAMITE} = req.body;

    const sql = 'INSERT INTO TRAMITES_AREAS (ID_AREA, ID_TRAMITE) VALUES ( :ID_AREA, :ID_TRAMITE )';

    try {

        let dbresponse = await BD.dbConnection(sql, [ID_AREA, ID_TRAMITE], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'No se pudo desasociar el tramite con éxito'
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

const desasociarTramiteArea = async (req = request, res = response)=>{
    const {ID_AREA, ID_TRAMITE} = req.body;

    const sql = 'DELETE FROM TRAMITES_AREAS WHERE ID_AREA = :ID_AREA AND ID_TRAMITE = :ID_TRAMITE';

    try {

        let dbresponse = await BD.dbConnection(sql, [ID_AREA, ID_TRAMITE], true);

        if(dbresponse.rowsAffected === 0 ){
            return res.status(400).json({
                OK: false,
                MSG: 'No se pudo asociar el tramite con éxito'
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
    getTramitesAsociados,
    getNotTramitesNoAsociados,
    asociarTramiteArea,
    desasociarTramiteArea
}