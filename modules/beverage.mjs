import DBManager from "./storageMannager.mjs"
class Beverage {

    constructor(userId, date, id, count) {

        ///TODO: Are these the correct fields for your project?
        this.userId = userId;
        // this.description = description;
        this.date = date;
        this.id = id;
        this.count = count;


        
      }
  
      async save() {
        console.log(this)

        if (this.id != null){
          return DBManager.upadateDrink(this)
        }else{
          return DBManager.loggDrinks(this)
        }
        
        
      }

      async delete() {
        console.log(this.id + " THIS IS MY ID")
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
                    dbDrink: dbDrink, // Assuming this is the retrieved data
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
                error: error.message, // Include the error message for debugging
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
                  shoppinglist: dbDrink
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