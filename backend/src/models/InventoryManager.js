const AbstractManager = require("./AbstractManager");

class InventoryManager extends AbstractManager {
  constructor() {
    super({ table: "inventory" });
  }

  insert(potion, ration, bandage, torch) {
    return this.database.query(
      `INSERT INTO ${this.table} (potion, 
        ration, 
        bandage, 
        torch) VALUES (?, ?, ?, ?)`,
      [potion, ration, bandage, torch]
    );
  }

  update(id, potion, ration, bandage, torch) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      potion = ?,
      ration = ?,
      bandage = ?,
      torch = ?
      WHERE id = ?`,
      [potion, ration, bandage, torch, id]
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

module.exports = InventoryManager;
