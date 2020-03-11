const Router = require("koa-router");
const router = new Router();
const itemsController = require("../controllers/itemsController");
const BASE_URL = `/api/v1/items`;

router.get(`${BASE_URL}`, itemsController.index);
router.get(`${BASE_URL}/:id`, itemsController.show);
router.post(`${BASE_URL}`, itemsController.create);
router.del(`${BASE_URL}/:id`, itemsController.destroy);

module.exports = router;