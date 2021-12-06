const router = require("express").Router();
const versionOne = require("./v1");

router.use(versionOne);

module.exports = router;
