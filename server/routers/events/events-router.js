const express = require("express");
const router = express.Router();
const { getActiveEvent } = require("../../controllers/events/events-controller");

router.get("/active-event", getActiveEvent);

module.exports = router;
