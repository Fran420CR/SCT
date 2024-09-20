const { Router } = require('express');
const { check, header } = require('express-validator');
const { getTramitesAreas, updateTramitesAreas, getNotTramitesAreas, getTramitesAsociados, getNotTramitesNoAsociados, asociarTramiteArea, desasociarTramiteArea } = require('../controllers/tramites-areas.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// GET TRAMITES DE UN AREA
router.get('/asociados',[
    header('id-area', 'El ID_AREA es obligatorio').notEmpty().isNumeric(),
    validarCampos
], getTramitesAsociados );

// GET TRAMITES QUE NO ESTAN EN UN AREA
router.get('/no-asociados',[
    header('id-area', 'El ID_AREA es obligatorio').notEmpty().isNumeric(),
    validarCampos
], getNotTramitesNoAsociados);


// ADD ASOCIAR TRAMITE
router.post('/asociar',[
    check('ID_AREA', 'El ID_AREA es obligatorio').notEmpty().isNumeric(),
    check('ID_TRAMITE', 'El ID_TRAMITE es obligatorio').notEmpty().isNumeric(),
    validarCampos
], asociarTramiteArea);

// ADD DESASOCIAR TRAMITE
router.post('/desasociar',[
    check('ID_AREA', 'El ID_AREA es obligatorio').notEmpty().isNumeric(),
    check('ID_TRAMITE', 'El ID_TRAMITE es obligatorio').notEmpty().isNumeric(),
    validarCampos
], desasociarTramiteArea);





module.exports = router;