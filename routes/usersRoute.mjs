import express from "express";
import User from "../modules/user.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const USER_API = express.Router();
USER_API.use(express.json()); 

USER_API.post('/', async (req, res, next) => {
    const { name, email, password } = req.body;

    if (name != "" && email != "" && password != "") {
        let user = new User();
        user.name = name;
        user.email = email;
        user.pswHash = password;

        let exists = false;
        if (!exists) {
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
    let user = new User(); 
    console.log(email);
    
    user.name = name;
    user.email = email;
    user.pswHash = password;
    user.id = id

    let exists = false;
    if (!exists) {
        user = await user.save();
        res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(user)).end();
    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
    }
});

USER_API.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = new User();
    user.id = id;

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

