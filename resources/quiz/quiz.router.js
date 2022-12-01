import { Router } from "express";
import crudControlers from './quiz.controllers.js';

const quizRouter = Router();


quizRouter
    .route('/')
    .get(crudControlers.getMany)
    .post(crudControlers.createOne)
    .delete(crudControlers.removeMany);



quizRouter
    .route('/:id')
    .get(crudControlers.getOne)
    .put(crudControlers.updateOne);


export default quizRouter;