const { Result } = require('express-validator');
const connection = require('../configs/database');

module.exports = {
    find(value){
        return new Promise((resolve,reject) => {
            const limitPage = 1;
            const startPage = ((value.page || 1)-1) * limitPage;
            const sqls = {
                count: 'SELECT COUNT(*) AS num_rows FROM foods_image',
                select: 'SELECT * FROM foods_image'
            };
            if (value.search_key && value.search_text) {
                const key = value.search_key;
                const txt = value.search_text;
                const sqlSearch = ` WHERE ${connection.escapeId(key)} LIKE ${connection.escape(`%${txt}%`)}`;
                sqls.count += sqlSearch;
                sqls.select += sqlSearch;
            };
            //หาจำนวนแถว
            connection.query(sqls.count, (error,result) => {
                if (error) return reject(error);
                const items = {result: [], rows: result[0].num_rows };

                // แบ่ง page
                sqls.select += ` LIMIT ${connection.escape(startPage)},${limitPage}`;
                connection.query(sqls.select, (error, result) => {
                    if (error) return reject(error);
                    items.result = result;
                    resolve(items);
                });
                
            });
        })
    },
    onAddimage(value){
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO foods_image SET ?',value,(error,result) =>{
                if (error) return reject(error);
                resolve(result);
            });
        });
    },
    onLoadImage(value) {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM foods_image', (error,result) => {
                if (error) return reject(error);
                if (result.length > 0) {
                    resolve(result);
                }
            })
        });
    }
};