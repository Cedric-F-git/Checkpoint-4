const AbstractManager = require("./AbstractManager");

class CharacterManager extends AbstractManager {
  constructor() {
    super({ table: "`character`" });
  }

  findByUser(id) {
    return this.database.query(
      `SELECT c.*, u.id AS userId FROM ${this.table} c
      INNER JOIN user u
      ON c.characterUserId = u.id
      WHERE u.id = ?`,
      [id]
    );
  }

  insert(
    name,
    classe,
    species,
    lifepoint,
    stamina,
    hope,
    money,
    physical,
    social,
    intelligence,
    weapon,
    armor,
    story,
    characterUserId,
    inventoryId,
    characterGroupId
  ) {
    return this.database.query(
      `INSERT INTO ${this.table} (name,
        classe,
        species,
        lifepoint,
        stamina,
        hope,
        money,
        physical,
        social,
        intelligence,
        weapon,
        armor,
        story,
        characterUserId,
        inventoryId,
        characterGroupId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        classe,
        species,
        lifepoint,
        stamina,
        hope,
        money,
        physical,
        social,
        intelligence,
        weapon,
        armor,
        story,
        characterUserId,
        inventoryId,
        characterGroupId,
      ]
    );
  }

  update(
    id,
    name,
    classe,
    species,
    lifepoint,
    stamina,
    hope,
    money,
    physical,
    social,
    intelligence,
    weapon,
    armor,
    story,
    inventoryId
  ) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      name = ?,
      classe = ?,
      species = ?,
      lifepoint = ?,
      stamina = ?,
      hope = ?,
      money = ?,
      physical = ?,
      social = ?,
      intelligence = ?,
      weapon = ?,
      armor = ?,
      story = ?,
      inventoryId = ?
      WHERE id = ?`,
      [
        name,
        classe,
        species,
        lifepoint,
        stamina,
        hope,
        money,
        physical,
        social,
        intelligence,
        weapon,
        armor,
        story,
        inventoryId,
        id,
      ]
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

module.exports = CharacterManager;
