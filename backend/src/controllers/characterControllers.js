const joi = require("joi");
// eslint-disable-next-line import/no-extraneous-dependencies
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      name: joi.string().max(45).presence(presence),
      classe: joi.string().max(45).presence(presence),
      species: joi.string().max(45).presence(presence),
      lifepoint: joi.number().integer().presence(presence),
      stamina: joi.number().integer().presence(presence),
      hope: joi.number().integer().presence(presence),
      money: joi.number().integer().presence(presence),
      physical: joi.number().integer().presence(presence),
      social: joi.number().integer().presence(presence),
      intelligence: joi.number().integer().presence(presence),
      weapon: joi.string().max(45).presence(presence),
      armor: joi.string().max(45).presence(presence),
      story: joi.string().max(4000).presence(presence),
      characterUserId: joi
        .number()
        .integer()
        .presence("optional")
        .allow(null)
        .allow(""),
      inventoryId: joi
        .number()
        .integer()
        .presence("optional")
        .allow(null)
        .allow(""),
      characterGroupId: joi
        .number()
        .integer()
        .presence("optional")
        .allow(null)
        .allow(""),
    })
    .validate(data, { abortEarly: false }).error;
};

// eslint-disable-next-line consistent-return
const browse = (req, res) => {
  const userId = req.params.id;

  models.character
    .findByUser(userId)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.character
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  const errors = validate(req.body, false);

  if (errors) {
    console.warn(errors);
    res.status(422).send({ errors });
    return;
  }

  const id = parseInt(req.params.id, 10);
  const {
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
    characterGroupId,
    inventoryId,
  } = req.body;

  models.character
    .update(
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
      characterGroupId,
      inventoryId
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// eslint-disable-next-line consistent-return
const add = (req, res) => {
  const {
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
  } = req.body;

  const data = {
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
  };

  const errors = validate(data);
  if (errors) {
    return res.status(422).json({ errors });
  }

  models.character
    .insert(
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
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err.errno === 1062) {
        res.status(409).send("User already exists");
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

const destroy = (req, res) => {
  models.character
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
