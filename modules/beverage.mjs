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
          return DBManager.upadateDrinks(this)
        }else{
          return DBManager.loggDrinks(this)
        }
        
        
      }

      async delete() {
        console.log(this.id + " THIS IS MY ID")
        if (this.id !== null)  {
          return await DBManager.deleteUser(this);
        }   
    }
}

export default Beverage;