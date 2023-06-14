const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword, verifyToken } = require("./utils/auth");

const userControllers = require("./controllers/userControllers");

router.get("/user/company/:id", verifyToken, userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", userControllers.edit);
router.post("/user", hashPassword, userControllers.add);
router.post("/login", userControllers.findByEmailToNext, verifyPassword);
router.delete("/user/:id", userControllers.destroy);

module.exports = router;
