import pg from "pg";
import SuperLogger from "./SuperLogger.mjs";
import { HttpCodes } from "./httpCodes.mjs";


/// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {

    #credentials = {};

    constructor(connectionString) {
        this.#credentials = {
            connectionString: process.env.DB_CONNECTIONSTRING_PROD,
            ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false
        };

    }


    async updateUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('UPDATE "public"."users" set "name" = $1, "email" = $2, "pswHash" = $3 where id = $4;', [user.name, user.email, user.pswHash, user.id]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.

            //TODO Did we update the user?

        } catch (error) {
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return user;

    }

    async deleteUser(user) {
        const client = new pg.Client(this.#credentials);
        console.log(user.id)
        try {
            await client.connect();
            const output = await client.query('DELETE FROM "public"."users" WHERE id = $1;', [user.id]);
            const isHeThere = await client.query('SELECT * FROM "public"."users" WHERE "id" = $1', [user.id]);
            if(output.rows[0]){
                console.log("he is still in here")
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error; // Handle or rethrow the error
        } finally {
            client.end(); // Always disconnect from the database.
        }
    }

    async createUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'INSERT INTO "public"."users"("name", "email", "pswHash") VALUES($1::TEXT, $2::TEXT, $3::TEXT) RETURNING id;';
            const parms = [user.name, user.email, user.pswHash];
            await client.connect();
            const output = await client.query(sql, parms);
            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.

            if (output.rows.length == 1) {
                // We stored the user in the DB.
                user.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return user;

    }
    async get(user) {
        const client = new pg.Client(this.#credentials);
        user = null;
    
        try {
            await client.connect();
            const output = await client.query('SELECT * FROM "public"."users" WHERE "id" = $1', [user.id]);
    
            console.log(output);
            user = output.rows[0];
            // Rest of your code
    
        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
    
        return user;
    }


    async loginUser(email, password) {
        const client = new pg.Client(this.#credentials);
        let user = null;
    
        try {
            await client.connect();
            const output = await client.query('SELECT * FROM "public"."users" WHERE "email" = $1', [email]);
    
            console.log(output);
            user = output.rows[0];
           
    
        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
    
        return user;
    }
    async upadateDrink(drink) {
        //sjekk om drink ekistere

        //om ekists, update

        // om ikke lag en ny drink colum 

        // HUSK Å MEKK COUNT INT I BEVERAGE TABLE

        return drink;

    }
    
}    


export default new DBManager(process.env.DB_CONNECTIONSTRING_PROD);