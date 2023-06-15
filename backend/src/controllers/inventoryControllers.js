const joi = require("joi");
// eslint-disable-next-line import/no-extraneous-dependencies
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      potion: joi.number().integer().presence(presence),
      ration: joi.number().integer().presence(presence),
      bandage: joi.number().integer().presence(presence),
      torch: joi.number().integer().presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

// eslint-disable-next-line consistent-return
const browse = (req, res) => {
  models.inventory
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.inventory
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
  const { potion, ration, bandage, torch } = req.body;

  models.inventory
    .update(id, potion, ration, bandage, torch)
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
  const { potion, ration, bandage, torch } = req.body;

  const data = { potion, ration, bandage, torch };

  const errors = validate(data);
  if (errors) return res.sendStatus(422);
  console.warn(errors);

  models.inventory
    .insert(potion, ration, bandage, torch)
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
  models.inventory
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
