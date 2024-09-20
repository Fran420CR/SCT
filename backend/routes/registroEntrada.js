const { Router } = require('express');
const { check } = require('express-validator');
const { agregarRegistroEntrada } = require('../controllers/registroEntrada.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// ADD REGISTRO ENTRADA
router.post('/agregar',[
    check('CEDULA_CLIENTE', 'La cédula del cliente es obligatoria').notEmpty().isLength({min: 9}),
    check('HORA', 'La hora es obligatoria para el registro').notEmpty(),

    check('FECHA', 'La fecha proporcionada tiene un formato incorrecto').isDate({format:'DD/MM/YYYY'})

        .notEmpty().withMessage('La fecha es obligatoria para el registro'),
    validarCampos
],agregarRegistroEntrada);



module.exports = router;