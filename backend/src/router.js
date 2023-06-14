const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword, verifyToken } = require("./utils/auth");

const userControllers = require("./controllers/userControllers");
const characterControllers = require("./controllers/characterControllers");
const inventoryControllers = require("./controllers/inventoryControllers");
const groupControllers = require("./controllers/groupControllers");

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

router.get("/group", groupControllers.browse);
router.get("/group/:id", groupControllers.read);
router.put("/group/:id", groupControllers.edit);
router.post("/group", groupControllers.add);
router.delete("/group/:id", groupControllers.destroy);

router.get("/inventory", inventoryControllers.browse);
router.get("/inventory/:id", inventoryControllers.read);
router.put("/inventory/:id", inventoryControllers.edit);
router.post("/inventory", inventoryControllers.add);
router.delete("/inventory/:id", inventoryControllers.destroy);

module.exports = router;
