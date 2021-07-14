const { Result } = require('express-validator');
const connection = require('../configs/database');

module.exports = {
    
    onVoteimage(value){
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO vote_image SET ?',value,(error,result) =>{
                if (error) return reject(error);
                resolve(result);
            });
        });
    },
};