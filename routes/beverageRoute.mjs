import express from "express";
import Beverage from "../modules/beverage.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const BEVERAGE_API = express.Router();

BEVERAGE_API.post('/', async (req, res, next) => { // assumes userId and date as input
    console.log(req.body)

    const { userId, date, count } = req.body;

    if (userId != "" && date != "" && count != "") {
        let drink = new Beverage();
        drink.count = count
        drink.userId = userId
        drink.date = date

        ///TODO: Does the user exist?
        let exists = false;
        if (!exists) {
            //TODO: What happens if this fails?
            drink = await drink.save()
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(drink)).end();
        } else {
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});


BEVERAGE_API.get('/getdrink', async (req, res, next) => {
    const userId  = req.query.userId;
    console.log("hello"+userId);
    if (!userId) {
        return res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Missing data").end();
    }

    try {
        const drink = new Beverage();
        drink.userId = userId;
        const loginResult = await drink.getDringData();
        console.log("kjkdjfjkfnjkf"+loginResult);

        if (loginResult.success) {
            const contents = loginResult.dbDrink;
            console.log("uuuuuf"+contents);
            res.status(HttpCodes.SuccesfullRespons.Ok).json(contents).end();
        } else {
            console.error("Login failed:", loginResult.message);
            if (loginResult.error) {
                console.error("Detailed error:", loginResult.error);
            }
            res.status(HttpCodes.ClientSideErrorRespons.Unauthorized).send("Invalid login credentials");
        }
    } catch (error) {
        
        console.error("Unexpected error:", error);
        res.status(HttpCodes.ServerSideErrorRespons.InternalServerError).send("Internal server error");
    }
});

BEVERAGE_API.delete('/delete', async (req, res) => {
    console.log("INNI METODEN")
    console.log("IDEN JEG FÅR INN" + req.query.id)
    const { id } = req.query;
    const drink = new Beverage();
    drink.id = id;
  

    try{
        await drink.delete();
        res.status(HttpCodes.SuccesfullRespons.Ok).send("User Dosen't exist anymore").end();
    } catch (error) {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("cant delete").end();
    }
});



export default BEVERAGE_API