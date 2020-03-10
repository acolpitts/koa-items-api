const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const itemsRoutes = require("./routes/items.routes");

const app = new Koa();
const PORT = process.env.PORT || 8081;

app.use(bodyParser());
app.use(itemsRoutes.routes());

const server = app.listen(PORT).on("error", err => {
  console.error(err);
});

module.exports = server;