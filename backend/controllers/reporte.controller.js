const BD = require('../database/config');
const { response, request } = require('express');


const getReporte = async(req = request, res = response)=>{

    const sql = 'SELECT * FROM REPORTE_COMPLETO';
    const reporteCompleto = []; 

    try {

        let dbresponse = await BD.dbConnection(sql, [], false);

        dbresponse.rows.map(data=>{
            const reporte = {
                'ID_REGISTRO_TRAMITE': data[0],
                'NOMBRE_AREA': data[1],
                'NOMBRE_TRAMITE': data[2],
                'NOMBRE_CLIENTE': data[3],
                'NOMBRE_USUARIO': data[4],
                'FECHA_Y_HORA': data[5],
            }
            reporteCompleto.push(reporte);
        });

        return res.json({
            OK:true,
            REPORTE: reporteCompleto
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
    getReporte
}