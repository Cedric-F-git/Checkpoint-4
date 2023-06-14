const AbstractManager = require("./AbstractManager");

class GroupManager extends AbstractManager {
  constructor() {
    super({ table: "`group`" });
  }

  insert(name) {
    return this.database.query(`INSERT INTO ${this.table} (name) VALUES (?)`, [
      name,
    ]);
  }

  update(id, name) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      name = ?
      WHERE id = ?`,
      [name, id]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} 
      WHERE id = ?`,
      [id]
    );
  }
}

module.exports = GroupManager;
