import DBManager from "./storageMannager.mjs"
class Beverage {

    constructor(userId, date, id, count) {

        this.userId = userId;
        this.date = date;
        this.id = id;
        this.count = count;
      }
  
      async save() {
      
        if (this.id != null){
          return DBManager.upadateDrink(this)
        }else{
          return DBManager.loggDrinks(this)
        }
      }

      async delete() {
        if (this.id !== null)  {
          return await DBManager.deleteDrink(this);
        }   
      }

      async getDringData() {
        let dbDrink;
    
        try {
            dbDrink = await DBManager.getDrink(this.userId);
            
            if (dbDrink.length > 0) {
                return {
                    success: true,
                    dbDrink: dbDrink,
                };
            } else {
                return {
                    success: false,
                    message: "No drink found for the user",
                };
            }
        } catch (error) {
            return {
                success: false,
                message: "Error occurred while fetching drink data",
                error: error.message, 
            };
        }
      } 

      async get() {
        let dbDrink;;

        try {
          dbDrink = await DBManager.getDrink(this.userId);
            if (dbDrink.length > 0 ) {
              
                return {
                    success: true,
                    dbDrink: dbDrink
                };
            } else {
                return {
                    success: false,
                    message: "User not found or no shopping lists found for the user"
                };
            }
        } catch (error) {
            console.error("Error occurred during get shoppinglist:", error);
            return {
                success: false,
                message: "An unexpected error occurred during shoppinglist"
            };
        }
      } 
}

export default Beverage;