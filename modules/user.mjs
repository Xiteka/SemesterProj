import DBManager from "./storageMannager.mjs"
class User {

    constructor() {
        ///TODO: Are these the correct fields for your project?
        this.email;
        this.pswHash;
        this.name;
        this.id;
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
}

export default User;