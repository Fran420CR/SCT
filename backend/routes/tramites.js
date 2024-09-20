const { Router } = require('express');
const { check, header } = require('express-validator');
const { agregaTramite, eliminarTramite, actualizarTramite, getTramites, actualizarEstadoTramite, getTramitesHabilitados } = require('../controllers/tramites.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// GET TRAMITES
router.get('/', getTramites);

// GET TRAMITES HABILITADOS
router.get('/habilitados', getTramitesHabilitados);

// ADD TRAMITE
router.post('/agregar',[
    check('NOMBRE_TRAMITE', 'El nombre del trámite es obligatorio').notEmpty(),
    check('FECHA', 'La fecha de creacion del trámite es obligatoria').notEmpty().isDate({format:'DD/MM/YYYY'}),
    validarCampos
],agregaTramite);

// UPDATE TRAMITE
router.put('/actualizar',[
    check('ID_TRAMITE', 'El ID_TRAMITE es obligatorio').notEmpty().isNumeric(),
    check('NOMBRE_TRAMITE', 'El NOMBRE_TRAMITE es obligatorio').notEmpty(),
    validarCampos
],actualizarTramite);

//UPDATE ESTADO DEL TRAMITE
router.put('/actualizarestado',[
    check('ID_TRAMITE', 'El ID_TRAMITE es obligatorio').notEmpty().isNumeric(),
    check('ESTADO', 'El ESTADO es obligatorio').notEmpty().isNumeric(),
    validarCampos
],actualizarEstadoTramite);



// DELETE TRAMITE
router.delete('/eliminar',[
    header('id-tramite', 'El ID_TRAMITE es obligatorio').notEmpty().isNumeric(),
    validarCampos
],eliminarTramite);


module.exports = router;