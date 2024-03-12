import DBManager from "./storageMannager.mjs"
class User {

    constructor(email, pswHash, name, id) {
        ///TODO: Are these the correct fields for your project?
        this.email = email;
        this.pswHash = pswHash;
        this.name = name;
        this.id = id;
      }
  
      async save() {
  
        /// TODO: What happens if the DBManager fails to complete its task?
  
        // We know that if a user object dos not have the ID, then it cant be in the DB.
        if (this.id == null) {
          return await DBManager.createUser(this);
        } else {
          return await DBManager.updateUser(this);
        }
      }

      async delete() {
        console.log(this.id + " THIS IS MY ID")
        if (this.id !== null)  {
          return await DBManager.deleteUser(this);
        }
      
    }
}

export default User;