const Koa = require("koa");
const cors = require('@koa/cors');
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const itemsRoutes = require("./routes/items.routes");
const logsRoutes = require("./routes/logs.routes");

const app = new Koa();
const PORT = process.env.PORT || 8081;
const env = process.env.NODE_ENV || "test";

// Log requests to console in development
if (env === "dev") app.use(logger());

app.use(cors());
app.use(bodyParser());
app.use(itemsRoutes.routes());
app.use(logsRoutes.routes());

const server = app.listen(PORT).on("error", err => {
  console.error(err);
}); 

module.exports = server;