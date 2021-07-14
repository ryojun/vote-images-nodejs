const router = require('express').Router();
const account = require('./account');
const imagesmanager = require('./imagesmanager');
const votemanager = require('./imagevote')
//Account route
router.use('/account', account);
router.use('/imagesmanager', imagesmanager);
router.use('/voteimage', votemanager);

module.exports = router;