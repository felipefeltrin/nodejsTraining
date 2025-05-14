export default class User {
  ID = null;
  FirstName = null;
  LastName = null;
  BirthDate = null;
  Username = null;
  Password = null;

  setUser(userData) {
    if(userData.ID && userData.ID !== this.getID()) {
      this.setID(userData.ID);
      this.setFirstName(userData.FirstName);
      this.setLastName(userData.LastName);
      this.setBirthDate(userData.BirthDate);
    }
    return this;
  }

  getID() {
    return this.ID;
  }

  setID(newID) {
    this.ID = newID;
  }

  getFirstName() {
    return this.FirstName;
  }

  setFirstName(newFirstName) {
    this.FirstName = newFirstName;
  }

  getLastName() {
    return this.LastName;
  }

  setLastName(newLastName) {
    this.LastName = newLastName;
  }

  getBirthDate() {
    return new Date(this.BirthDate).toUTCString();
  }

  setBirthDate(newBirthDate) {
    this.BirthDate = newBirthDate;
  }
}