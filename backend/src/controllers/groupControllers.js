const joi = require("joi");
// eslint-disable-next-line import/no-extraneous-dependencies
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      name: joi.string().max(45).presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

// eslint-disable-next-line consistent-return
const browse = (req, res) => {
  models.group
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
  models.group
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
  const { name } = req.body;

  models.group
    .update(id, name)
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
  const { name } = req.body;

  const data = { name };

  const errors = validate(data);
  if (errors) return res.sendStatus(422);
  console.warn(errors);

  models.group
    .insert(name)
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
  models.group
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
