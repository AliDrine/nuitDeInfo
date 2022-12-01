import { Router } from 'express'
import { getAll, getById, me, updateMe,updateById,deleteById } from './users.controllers.js'

const router = Router()


// GET CURRENT USER
// UPDATE CURRENT USER

router
    .route('/me')
    .get(me)
    .put(updateMe)



// GET ALL USERS
router
    .route('/')
    .get(getAll)

    
// GET USER BY ID 
// UPDATE USER BY ID
// DELTE USER BY ID 
router
    .route('/:id')
    .get(getById)
    .put(updateById)
    .delete(deleteById)


export default router
