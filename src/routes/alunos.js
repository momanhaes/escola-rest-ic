const router = require('express').Router();
const alunoController = require('../controllers/alunos');
const validateId = require('../middlewares/validateId');

router.get('/', alunoController.findAll);

router.get('/:_id', validateId, alunoController.findById);

router.post('/', alunoController.create);

router.delete('/:_id', validateId, alunoController.deleteById);

module.exports = router;
