import { Router } from "express";
import  crudControlers  from './example.controllers.js'

const exampleRouter = Router();



exampleRouter
   .route('/')
   .get(crudControlers.getMany)
   .post(crudControlers.createOne)
   .delete(crudControlers.removeMany);

 

exampleRouter
   .route('/:id')
   .get(crudControlers.getOne)
   .put(crudControlers.updateOne);


export default exampleRouter;

