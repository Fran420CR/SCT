const BD = require('../database/config');
const { response, request } = require('express');



// GET CLIENTE/CLIENTE-INVITADO POR CEDULA
const getCliente = async (req = request, res = response)=>{

    const CEDULA = req.header('cedula');
    const sql = 'SELECT * FROM INFORMACION_CLIENTES WHERE CEDULA = :CEDULA';
    const cliente = {}
    
    try {

        let dbresponse = await BD.dbConnection(sql, [CEDULA], false);

        //Si no encontró a ningun cliente en la BD devuelve un mensaje

        if(dbresponse.rows.length === 0){
            return res.status(404).json({
                OK: false,
                MSG: 'No se encontró ningún cliente registrado con la cédula proporcionada'
            });
        }

        // Carga la in formacion encontrada en un objeto llamado 'cliente'
        dbresponse.rows.map((data)=>{
            dbresponse.metaData.map(({name}, index)=>{
                cliente[name] = data[index];
            })
        });

        // Devuelve los datos del cliente
        return res.status(200).json({
            OK: true,
            CLIENTE: cliente
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }
};


// ADD CLIENTE INVITADO

const agregarClienteInvitado = async (req = request, res = response)=>{
    const {CEDULA, NOMBRE, APELLIDO_1, APELLIDO_2} = req.body;
    const sql = "INSERT INTO CLIENTES_INVITADOS (CEDULA, NOMBRE, APELLIDO_1, APELLIDO_2) VALUES ( :CEDULA, :NOMBRE, :APELLIDO_1, :APELLIDO_2 )";

    try {

        await BD.dbConnection(sql, [CEDULA, NOMBRE, APELLIDO_1, APELLIDO_2], true);

        return res.status(201).json({
            OK: true,
            NOMBRE,
            APELLIDO_1
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
    getCliente,
    agregarClienteInvitado
}



