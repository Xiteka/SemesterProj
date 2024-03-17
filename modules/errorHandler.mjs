import { HttpCodes  }from "./httpCodes.mjs";

const errorHandler = ((err, req, res, next) =>{
 console.error(err.stack);
 res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send('Something is wrong!'+err)
});

export default errorHandler;