const conn = require('../configs/db')

module.exports = {

    getCategory:()=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * FROM category', 
            (err, result)=>{
                if (!err) {
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    
    addCategory:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO category SET ?', data, (err,result)=>{
                if (!err) {
                    resolve(data)
                }
                else{
                    reject(new Error(err))
                }
            })
        })
    },

    updateCategory:(data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('UPDATE category SET ? WHERE id_category=?', data, (err, result)=>{
                if (!err) {
                    resolve(data)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },

    deleteCategory:(data) =>{
        return new Promise ((resolve, reject)=>{
            conn.query('DELETE from category where id_category = ?', [data], (err, result)=>{
                if (!err) {
                    resolve(data)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}