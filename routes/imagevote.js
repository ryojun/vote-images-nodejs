const router = require('express').Router();
const { check, validationResult } = require('express-validator/check');
const {onVoteimage} = require('../services/uservote');

router.post('/votefoods', [
    check('user_name').not().isEmpty(),
    check('Image_name').not().isEmpty(),
    check('Vote_type').not().isEmpty(),
    check('Image_vote').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        const vote = await onVoteimage(req.body);
        res.json(vote);
    }
    catch (ex) {
        res.error(ex);
    }
});

module.exports = router;