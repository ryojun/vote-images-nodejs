const router = require('express').Router();
const { check, query } = require('express-validator/check');
const {onAddimage, find} = require('../services/imagesmanager');
const {onVoteimage} = require('../services/uservote');
const service = require('../services/imagesmanager');
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');
const uploadDir = path.resolve('uploads');
const equipDir = path.join(uploadDir ,'foods');

// หน้าลงทะเบียน
router.post('/addimage', [
    check('Image_Name').not().isEmpty(),
    check('Image_shortcode').not().isEmpty(),
    check('Ig_account').not().isEmpty(),
    check('Image_rank').not().isEmpty(),
    check('Image_Like').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        //ตรวจสอบ Folder ท่าไม่มีก็ทำการสร้างใหม่
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        if (!fs.existsSync(equipDir)) fs.mkdirSync(equipDir);
        // แปลงข้อมูลรูปภาพเป็น Base64
        req.body.Image_shortcode = base64Img.imgSync(req.body.Image_shortcode, equipDir, `foods-${Date.now()}`).replace(`${equipDir}\\`, '');
        // res.json({ message: req.body});
        res.json({ message: await onAddimage(req.body)});
    }
    catch (ex) {
        res.error(ex);
    }
});

router.post('/:id', async (req, res) => {
    try {
        const item = await service.findOne({ id_table: req.params.id })
        if (!item) throw new Error('Not found item.');
        res.json(item);
    }
    catch (ex) {
        res.error(ex);
    }
});

//แสดงข้อมูลอุปกรณ์
router.get('/',[
    query('page').not().isEmpty().isInt().toInt()
], async (req,res) => {
    try{
        req.validate();
        res.json(await service.find(req.query))
    }
    catch(ex){ res.error(ex); }
});


module.exports = router;