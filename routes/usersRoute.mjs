import express from "express";
import User from "../modules/user.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const USER_API = express.Router();
USER_API.use(express.json()); // This makes it so that express parses all incoming payloads as JSON for this route.



USER_API.get('/:id', async (req, res, next) => {
    console.log("get/id")
    //-----Coments--------//
    // Tip: All the information you need to get the id part of the request can be found in the documentation 
    // https://expressjs.com/en/guide/routing.html (Route parameters)
    /// TODO: 
    // Return user object
    const { id } = req.body
    try {
        const user = new user();
        user.id = id;
        const getUserResult = await user.getUser();
        if (loginResult.succes) {
            const userInfo = loginResult.user;
            res.status(HttpCodes.SuccesfullRespons.Ok).json(userInfo).end();
        }
    }catch{

    }
})

USER_API.post('/', async (req, res, next) => {
    console.log(req.body)
    // This is using javascript object destructuring.
    // Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
    // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
    const { name, email, password } = req.body;

    if (name != "" && email != "" && password != "") {
        let user = new User();
        user.name = name;
        user.email = email;

        ///TODO: Do not save passwords.
        user.pswHash = password;

        ///TODO: Does the user exist?
        let exists = false;
        if (!exists) {
            //TODO: What happens if this fails?
            user = await user.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
        } else {
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

USER_API.put('/:id', async (req, res) => {
    const { name, email, password, id } = req.body;
    let user = new User(); //TODO: The user info comes as part of the request 
    console.log(email);
    
    user.name = name;
    user.email = email;
    user.pswHash = password;
    user.id = id

    console.log(user);

    let exists = false;

    if (!exists) {

        user = await user.save();
        res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
    }

});

USER_API.delete('/:id', async (req, res) => {
    console.log("INNI METODEN")
    console.log("IDEN JEG FÅR INN" + req.params.id)
    const { id } = req.params;
    const user = new User();
    user.id = id;
    console.log(user.id)

    try{
        await user.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User Dosen't exist anymore").end();
    } catch (error) {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("cant delete").end();
    }
});

    
USER_API.post('/loggIn', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) { 
        return res.status(HttpCodes.ClientSideErrorRespons.Forbidden).send("missing input").end();
    } try {
        const user = new User();
        user.email = email;
        user.pswHash = password;
        const loginResult = await user.login();
        if (loginResult.success) {
            const userInformation = loginResult.user;
            return res.status(HttpCodes.SuccesfullRespons.Ok).send(userInformation).end();
        } else {
            return res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("logging failed").end();
        }
    } catch (error) {
        console.error(error.stack)
        return res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Infernal Server Error").end();
    }

});

export default USER_API

