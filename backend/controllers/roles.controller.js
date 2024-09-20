const BD = require('../database/config');
const { response, request } = require('express');

const getRoles= async (req = request, res = response)=>{

    const sql = 'SELECT * FROM ROLES';
    const roles = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [], false);

        dbresponse.rows.map((data)=>{
            const rol = {}
            dbresponse.metaData.map(({name}, index)=>{
                rol[name] = data[index];
            })
            roles.push(rol);
        });
        
        return res.json({
            OK:true,
            ROLES: roles
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
    getRoles
}