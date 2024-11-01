const express = require("express");
const { getAdminStats } = require("../controllers/admin-controller");

const router = express.Router();

router.get("/", getAdminStats);

module.exports = router;
