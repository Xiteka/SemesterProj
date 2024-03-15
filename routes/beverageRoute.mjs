import express from "express";
import Beverage from "../modules/beverage.mjs";
import { HttpCodes } from "../modules/httpCodes.mjs";

const BEVERAGE_API = express.Router();

BEVERAGE_API.post('/', async (req, res, next) => { // assumes userId and date as input
    console.log(req.body)
    
    const { userId, date, description } = req.body;

    if (userId != "" && date != "" && description != "") {
        let drink = new Beverage();
        
        

        ///TODO: Does the user exist?
        let exists = false;
        if (!exists) {
            //TODO: What happens if this fails?
            drink = await drink.save();
            res.status(HttpCodes.SuccesfullRespons.Ok).json(JSON.stringify(drink)).end();
        } else {
            res.status(HttpCodes.ClientSideErrorRespons.BadRequest).end();
        }

    } else {
        res.status(HttpCodes.ClientSideErrorRespons.BadRequest).send("Mangler data felt").end();
    }

});

export default BEVERAGE_API