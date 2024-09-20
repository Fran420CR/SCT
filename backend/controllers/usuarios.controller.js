const BD = require('../database/config');
const { response, request } = require('express');


const getUsuarios= async (req = request, res = response)=>{

    const sql = 'SELECT * FROM USUARIOS';
    const usuarios = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [], false);

        dbresponse.rows.map((data)=>{
            const usuario = {}
            dbresponse.metaData.map(({name}, index)=>{
                usuario[name] = data[index];
            })
            usuarios.push(usuario);
        });
        
        return res.json({
            OK:true,
            USUARIOS: usuarios
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};

const getRolesUsuarios= async (req = request, res = response)=>{

    const { CEDULA_USUARIO } = req.body;
    const sql = 'SELECT NOMBRE_ROL FROM USUARIOS_ROLES WHERE CEDULA_USUARIO = :CEDULA_USUARIO';
    const roeles_usuarios = [];

    try {

        let dbresponse = await BD.dbConnection(sql, [CEDULA_USUARIO], false);

        dbresponse.rows.map((data)=>{
            const rol_usuario = {}
            dbresponse.metaData.map(({name}, index)=>{
                rol_usuario[name] = data[index];
            })
            roeles_usuarios.push(rol_usuario);
        });
        
        return res.json({
            OK:true,
            USUARIOS: roeles_usuarios
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            OK: false,
            MSG: 'Por favor hable con el administrador'
        });
    }

};
 
//PETICION QUE SE USARA PARA EL REGISTRO DEL TRAMITE
/*
  getUsuarioConRoles = async (req = request, res = response) => {
    const { CEDULA_USUARIO } = req.body;
  
    try {
      const sql = `SELECT U.CEDULA, U.NOMBRE, U.APELLIDO_1, U.APELLIDO_2, U.FECHA_NAC, UR.NOMBRE_ROL
                   FROM USUARIOS U
                   JOIN USUARIOS_ROLES UR ON U.CEDULA = UR.CEDULA_USUARIO
                   WHERE U.CEDULA = :CEDULA_USUARIO`;
      const dbresponse = await BD.dbConnection(sql, [CEDULA_USUARIO], false);
  
      const usuario = {
        CEDULA: dbresponse.rows[0][0],
        NOMBRE: dbresponse.rows[0][1],
        APELLIDO_1: dbresponse.rows[0][2],
        APELLIDO_2: dbresponse.rows[0][3],
        ROLES: dbresponse.rows.map((row) => ({ NOMBRE_ROL: row[5] })),
      };
  
      return res.json({
        OK: true,
        USUARIO: usuario,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        OK: false,
        MSG: "Por favor hable con el administrador",
      });
    }
  };
  */
// PETICION PARA ASIGNARLE ROLES AL USUARIO
    asignarRolesUsuario = async (req = request, res = response) => {
    const { CEDULA_USUARIO, ROLES } = req.body;
  
    try {
      for (const rol of ROLES) {
        const { NOMBRE_ROL } = rol;
        const sql = 'INSERT INTO USUARIOS_ROLES (NOMBRE_ROL, CEDULA_USUARIO) VALUES (:NOMBRE_ROL, :CEDULA_USUARIO)';
        await BD.dbConnection(sql, [NOMBRE_ROL, CEDULA_USUARIO], true);
      }
  
      return res.json({
        OK: true,
        MSG: 'Roles asignados correctamente al usuario',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        OK: false,
        MSG: 'Por favor hable con el administrador',
      });
    }
  };
  
  

module.exports = {
    getUsuarios,
    getRolesUsuarios
}