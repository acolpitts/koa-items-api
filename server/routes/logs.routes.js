const Router = require("koa-router");
const router = new Router();
const logsController = require("../controllers/logsController");
const BASE_URL = `/api/v1/logs`;

router.get(`${BASE_URL}`, logsController.index);

module.exports = router;