const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword, verifyToken } = require("./utils/auth");

const userControllers = require("./controllers/userControllers");
const characterControllers = require("./controllers/characterControllers");

router.get("/user", verifyToken, userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", userControllers.edit);
router.post("/user", hashPassword, userControllers.add);
router.post("/login", userControllers.findByEmailToNext, verifyPassword);
router.delete("/user/:id", userControllers.destroy);

router.get("/character", characterControllers.browse);
router.get("/character/:id", characterControllers.read);
router.put("/character/:id", characterControllers.edit);
router.post("/character", characterControllers.add);
router.delete("/character/:id", characterControllers.destroy);

module.exports = router;
