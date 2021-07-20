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
    onLoadVote() {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM vote_image', (error,result) => {
                if (error) return reject(error);
                if (result.length > 0) {
                    resolve(result);
                }
            })
        });
    }
};