const express = require("express");

const router = express.Router();

const presenteController = require("../controllers/presenteController");

router.get("/", presenteController.listar);

router.post("/reservar", presenteController.reservar);

module.exports = router;