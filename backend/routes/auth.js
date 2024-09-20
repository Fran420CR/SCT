const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validarUsuario } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

// Register
router.post( '/register', [
    check('CEDULA', 'La cedula es obligatoria').notEmpty().isLength({ min: 9 }),
    check('CONTRASENA', 'La contraseña es obligatoria').notEmpty(),
    check('NOMBRE', 'El nombre es obligatorio').notEmpty(),
    check('APELLIDO_1', 'El apellido_1 es obligatorio').notEmpty(),
    check('APELLIDO_2', 'El apellido_2 es obligatorio').notEmpty(),
    check('FECHA_NAC', 'La fecha de nacimiento').isDate({format:'DD/MM/YYYY'}),
    validarCampos
], crearUsuario);


// Login
router.post('/login',[
    check( 'CEDULA', 'La cedula es obligatoria').notEmpty().isLength( {min: 9} ).withMessage('La cedula debe tener al menos 9 dígitos'),
    check( 'CONTRASENA', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], loginUsuario)


// Validar Token
router.get('/validartoken', validarJWT, validarUsuario);

module.exports = router;