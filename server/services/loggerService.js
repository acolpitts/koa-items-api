const env = process.env.NODE_ENV || "test";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

const log = async (ctx, id=null) => {
  if(!ctx) {
    console.error('ERROR: LoggerService.log requires context');
    return
  }
  try {
    let pathURL = `${ctx.request.URL}/${id}`;
    if(!id) {
      pathURL = `${ctx.request.URL}`
    }
  
    const log = await knex("logs").insert({
      type: ctx.request.method,
      path: pathURL,
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