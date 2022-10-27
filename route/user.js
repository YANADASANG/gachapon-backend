const {Router} = require('express');
const controller = require('../controller/user');

const router = Router()

router.post('/', controller.checkUser),
router.post('/name',controller.getUserByName)

module.exports = router;