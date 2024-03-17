import DBManager from "./storageMannager.mjs"
class User {

    constructor(email, pswHash, name, id) {
        this.email = email;
        this.pswHash = pswHash;
        this.name = name;
        this.id = id;
      }
  
      async save() {
        if (this.id == null) {
          return await DBManager.createUser(this);
        } else {
          return await DBManager.updateUser(this);
        }
      }

      async login() {
        const dBUser = await DBManager.loginUser(this.email, this.pswHash);
        if (dBUser.id !== null) {
          if (dBUser.pswHash == this.pswHash) {
            this.id = dBUser.id
            this.name = dBUser.name
            this.email = dBUser.email
            this.pswHash = dBUser.pswHash

            return {
              success: true,
              user: {
                id: this.id,
                name: this.name,
                email: this.email
              }
            }
          } else {
            return {
              success: false,
              message: "wrong password"
            }
          } 
        } else {
          return {
            success: false,
            message: "no existing user"
          }
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