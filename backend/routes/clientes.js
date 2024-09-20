const { Router } = require('express');
const { header, check } = require('express-validator');
const { getCliente, agregarClienteInvitado } = require('../controllers/clientes.controller');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();


// GET CLIENTE
router.get('/',[
    header('cedula', 'La cédula del cliente es obligatoria').notEmpty(),
    header('cedula', 'La cédula no es válida').isLength({min:9}),
    validarCampos
], getCliente);


// ADD CLIENTE
router.post('/agregarInvitado',[
    check('CEDULA','La cédula es obligatoria').notEmpty(),
    check('CEDULA','La cédula no es válida').isLength({min:9}),
    check('NOMBRE','El nombre es obligatorio').notEmpty(),
    check('APELLIDO_1','El primero apellido es obligatorio').notEmpty(),
    validarCampos    
], agregarClienteInvitado);










module.exports = router;