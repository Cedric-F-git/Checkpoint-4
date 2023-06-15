const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(pseudo, email, hashedPassword, usergroupId) {
    return this.database.query(
      `INSERT INTO ${this.table} (pseudo,
        email,
        hashedPassword,
        usergroupId) VALUES (?, ?, ?, ?)`,
      [pseudo, email, hashedPassword, usergroupId]
    );
  }

  update(id, pseudo, email, usergroupId) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      pseudo = ?,
      email = ?,
      usergroupId = ?
      WHERE id = ?`,
      [pseudo, email, usergroupId, id]
    );
  }

  findByEmail(email) {
    return this.database.query(
      `SELECT user.id, pseudo, email, hashedPassword, usergroupId FROM ${this.table} 
      WHERE email = ? `,
      [email]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} 
      WHERE id = ?`,
      [id]
    );
  }

  // findAll(companyId) {
  //   return this.database.query(
  //     `select user.id, firstname,
  // lastname,
  // email,
  // dateOfBirth,
  // liked,
  // profilePicture,
  // creationDate,
  // roleId,
  // companyId
  // teamId FROM user, team  WHERE roleId != 4 and user.teamId = team.id and companyId = ?`,
  //     [companyId]
  //   );
  // }
}

module.exports = UserManager;
