const env = process.env.NODE_ENV || "test";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

const index = async ctx => {
  try {
    const logs = await knex("logs")
      .select('*')
      .orderBy('created_at', 'desc')
      .limit(10);
    ctx.body = {
      data: logs
    };
  } catch (error) {
    console.error(error);
  }
};


module.exports = { index };