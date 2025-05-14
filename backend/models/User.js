export default class User {
  ID = null;
  FirstName = null;
  LastName = null;
  BirthDate = null;

  setUser(userData) {
    if(userFields.ID && userFields.ID !== this.getID()) {
      this.setID(userFields.ID);
      this.setFirstName(userFields.FirstName);
      this.setLastName(userFields.LastName);
      this.setBirthDate(userFields.BirthDate);
    }
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