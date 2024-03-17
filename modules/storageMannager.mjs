import pg from "pg";
import SuperLogger from "./SuperLogger.mjs";
import { HttpCodes } from "./httpCodes.mjs";

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

    //creatDrinks
    async loggDrinks(drink) {

        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'INSERT INTO "public"."beverage_table"("date", "userId", "count") VALUES($1, $2, $3)';
            const parms = [drink.date, drink.userId, drink.count];
            await client.connect();
            const output = await client.query(sql, parms);
            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.

            if (output.rows.length == 1) {
                // We stored the user in the DB.
                drink.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return drink;

    }

    async deleteDrink(drink) {

        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'DELETE FROM "public"."beverage_table" WHERE "id" = $1';
            const params = [drink.id];
            console.log(params + "yoyo");
            await client.connect();
            const output = await client.query(sql, params);
            return true

        } catch (error) {
            console.error(error);
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return drink;

    }

    async getDrink(userId) {
        const client = new pg.Client(this.#credentials);
        let drinkContent = [];

        try {
            await client.connect();
            console.log('Connected to the database');
            const sql = 'SELECT * FROM "public"."beverage_table" WHERE "userId" LIKE $1';
            const params = [userId];
            const output = await client.query(sql, params);

            console.log('Query executed successfully');

            if (output.rows.length > 0) {
                drinkContent = output.rows;
            } else {
                console.log('No shopping list found for the user');
            }

            console.log("this is shoppinglist", drinkContent); // Log shoppingList
            console.log("this is output", output); // Log output
        } catch (error) {
            console.error('Error in getShoppinglist:', error.stack);
            throw error;
        } finally {
            client.end();
            console.log('Disconnected from the database');
        }

        return drinkContent;
    }

    
    
}    


export default new DBManager(process.env.DB_CONNECTIONSTRING_PROD);