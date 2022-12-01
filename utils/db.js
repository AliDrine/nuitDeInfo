import mongoose from 'mongoose'
import options from '../config.js'
import logger from './logger.js';


const db = {
    successCallback: function(){
        logger("✅ Connected succefully to database!")
       
    },
    catchError:function(error){
        console.log("connextion to database failed !",error)
    }

}
export const connect = (url = options.dbUrl, opts = {}) => {
  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true, useUnifiedTopology: true, }
  ).then(db.successCallback)
   .catch(db.catchError)
}
