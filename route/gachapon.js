const {Router} = require('express');
const controller = require('../controller/gachapon');

const router = Router()

router.get('/:id',controller.getInventoryById);
router.get('/:id/newPlayer',controller.addNewPlayerCoin);
router.post('/:id/reward',controller.addReward)

module.exports = router;