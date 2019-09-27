const categoryModel = require('../models/categories')

module.exports ={
    getCategory: (req, res) =>{
        categoryModel.getCategory()
            .then(resultQuery =>{
                res.json({
                    status : 200,
                    message: 'Show data success',
                    data:resultQuery
                })
            })
            .catch(err =>{
                console.log(err)
                res.json({
                    status:400,
                    message:'Show data fail'
                })
            })
    },


    addCategory:(req, res) =>{

        var time    = new Date()
        var day     = String(time.getDate()).padStart(2, '0')
        var month   = String(time.getMonth()+1).padStart(2, '0')
        var year    = time.getFullYear()
        var datenow = year + "-" + month + "-" + day

        date_add    = datenow
        date_update = datenow

        const {id_category, name} = req.body
        const data   = {id_category, name, date_add, date_update }
        categoryModel.addCategory(data)
        .then(resultQuery =>{
            res.json({
                status  : 500,
                message : 'Add category success',
                data : resultQuery
            })
            .catch(err =>{
                res.json({
                    status : 500,
                    message: 'Add category fail'
                })
            })
        })
    },

    updateCategory:(req, res)=>{
        const {id} = req.params
        const {name} =req.body
        const data = {name}

        categoryModel.updateCategory([data, id])
        .then(resultQuery =>{
            res.json({
                status:200,
                message: 'Update category success',
                data: resultQuery
            })
        })
        .catch(err =>{
            res.json({
                status : 500,
                message: 'Update category fail'
            })
        })

    },
    deleteProduct:(req,res)=>{
        categoryModel.deleteCategory(req.params.id)
        .then(resultQuery =>{
            res.json({
                status : 200,
                message: 'Delete success',
                data   : resultQuery
            })
        })
        .catch(err=>{
            res.json({
                status:500,
                message: 'Delete data fail'
            })
        })
    }
}