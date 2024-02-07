import express from 'express' 
import { HttpCodes  }from "../../project/modules/httpCodes.mjs";


/*
// Your routes and other middleware go here
errorHandler.get('/', (req, res) => {
    // Simulate an error
    throw new Error('This is a test error');
  });

// Error handling middleware
errorHandler.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send('Something went wrong!');
});

errorHandler.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

const errorHandler = ((err, req, res, next) =>{
 console.error(err.stack);
 res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send('Something is wrong!'+err)
});

export default errorHandler;