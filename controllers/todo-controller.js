
const db = require('../models/db')

exports.getByUser = async (req, res, next) => {

    console.log(req.user.user_id)
    try{
        const todos = await db.todo.findMany({
            where: {
                user_id: req.user.user_id
            }
        })
        res.send({todos})
    }catch(err){
        next(err)
    }
}