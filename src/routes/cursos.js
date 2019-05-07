const router = require('express').Router();
const cursoController = require('../controllers/curso');

router.get('/', cursoController.findAll);

router.get('/:nome', cursoController.findByName);

router.post('/', cursoController.create);

router.put('/:_id', cursoController.update);

router.delete('/:_id', cursoController.deleteById)

module.exports = router;
