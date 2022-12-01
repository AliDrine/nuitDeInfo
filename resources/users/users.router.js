import { Router } from 'express'
import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,

} from './users.controllers.js'

const router = Router()


router.post("/", createUser);
router.get("/", getUsers);
router.get("/:user", getUser);
router.put("/:user", updateUser);
router.delete("/:user", deleteUser);



export default router