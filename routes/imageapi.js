const router = require('express').Router();
const { check } = require('express-validator/check');
const {onAddimage} = require('../services/imagesmanager');
const service = require('../services/imagesmanager');
const voteService = require('../services/uservote')
//add ข้อมูลรูป
router.post('/add', [
    check('Image_Name').not().isEmpty(),
    check('Image_shortcode').not().isEmpty(),
    check('Ig_account').not().isEmpty(),
    check('Image_rank').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        res.json({ message: await onAddimage(req.body)});
    }
    catch (ex) {
        res.error(ex);
    }
});

//แสดงข้อมูลอุปกรณ์ All
router.get('/all'
, async (req,res) => {
    try{
        req.validate();
        res.json({ message: await voteService.onLoadVote()});
    }
    catch(ex){ res.error(ex); }
});


module.exports = router;