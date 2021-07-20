const router = require('express').Router();
const account = require('./account');
const imagesmanager = require('./imagesmanager');
const votemanager = require('./imagevote')
const imageapi = require('./imageapi')

//Account route
router.use('/account', account);
router.use('/imagesmanager', imagesmanager);
router.use('/voteimage', votemanager);
router.use('/imageapi', imageapi);


module.exports = router;