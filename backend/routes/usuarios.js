const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios.controller');
const { getRolesUsuarios } = require('../controllers/usuarios.controller');


const router = Router();

// GET USUARIOS
router.get('/', getUsuarios);

// GET ROLES DE USUARIOS
router.get('/rolesusuario', getRolesUsuarios);

// router.get('/rolesporusuario', getUsuarioConRoles);

router.post('/asignarroles', asignarRolesUsuario);

module.exports = router;