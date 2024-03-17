import pg from "pg";

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

        } catch (error) {
        } finally {
            client.end();
        }
        return user;
    }

    async deleteUser(user) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('DELETE FROM "public"."users" WHERE id = $1;', [user.id]);
            const isHeThere = await client.query('SELECT * FROM "public"."users" WHERE "id" = $1', [user.id]);
            if (output.rows[0]) {
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        } finally {
            client.end();
        }
    }

    async createUser(user) {
        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'INSERT INTO "public"."users"("name", "email", "pswHash") VALUES($1::TEXT, $2::TEXT, $3::TEXT) RETURNING id;';
            const parms = [user.name, user.email, user.pswHash];
            await client.connect();
            const output = await client.query(sql, parms);

            if (output.rows.length == 1) {
                user.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
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
            user = output.rows[0];

        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return user;
    }

    async upadateDrink(drink) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            console.log("Updating")
            const output = await client.query('UPDATE "public"."beverage_table" set "count" = $1 WHERE "id" = $2;', [drink.count, drink.id]);

        } catch (error) {
        } finally {
            client.end();
        }
        return drink;
    }

    async loggDrinks(drink) {
        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'INSERT INTO "public"."beverage_table"("date", "userId", "count") VALUES($1, $2, $3)RETURNING id;';
            const parms = [drink.date, drink.userId, drink.count];
            await client.connect();
            const output = await client.query(sql, parms);

            if (output.rows.length == 1) {
                drink.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
        } finally {
            client.end();
        }
        return drink;
    }

    async deleteDrink(drink) {
        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'DELETE FROM "public"."beverage_table" WHERE "id" = $1';
            const params = [drink.id];
            await client.connect();
            const output = await client.query(sql, params);
            return true

        } catch (error) {
            console.error(error);
        } finally {
            client.end();
        }
        return drink;
    }

    async getDrink(userId) {
        const client = new pg.Client(this.#credentials);
        let drinkContent = [];

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."beverage_table" WHERE "userId" LIKE $1';
            const params = [userId];
            const output = await client.query(sql, params);

            console.log('Query executed successfully');

            if (output.rows.length > 0) {
                drinkContent = output.rows;
            } else {
                console.log('No shopping list found for the user');
            }

            console.log("this is shoppinglist", drinkContent);
            console.log("this is output", output);
        } catch (error) {
            console.error('Error in getShoppinglist:', error.stack);
            throw error;
        } finally {
            client.end();
        }
        return drinkContent;
    }
}

export default new DBManager(process.env.DB_CONNECTIONSTRING_PROD);