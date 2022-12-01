import { Router } from "express";
import crudControlers from './question.controller.js';

const questionRouter = Router();



questionRouter
    .route('/')
    .get(crudControlers.getMany)
    .post(crudControlers.createOne)
    .delete(crudControlers.removeMany);



questionRouter
    .route('/:id')
    .get(crudControlers.getOne)
    .put(crudControlers.updateOne);


export default questionRouter;