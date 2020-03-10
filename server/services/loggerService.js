const env = process.env.NODE_ENV || "test";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

const log = async (ctx, id) => {
  if(!ctx || !id) {
    console.error('ERROR: LoggerService.log requires both a context and resource id');
    return
  }
  try {
    const log = await knex("logs").insert({
      type: ctx.request.method,
      path: `${ctx.request.URL}/${id}`,
      ip: ctx.request.ip,
      agent: ctx.request.header['user-agent']
    });
  } catch(err) {
    console.error(err);
  }
}

module.exports = {
  log
};