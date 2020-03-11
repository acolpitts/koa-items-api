const env = process.env.NODE_ENV || "test";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);
const { log } = require("../services/loggerService")

const index = async ctx => {
  try {
    const items = await knex("items").select();
    ctx.body = {
      data: items
    };
  } catch (error) {
    console.error(error);
  }
};

const show = async ctx => {
  try {
    const { id } = ctx.params;
    const item = await knex("items")
      .select()
      .where({ id });
    if (!item.length) {
      throw new Error("The requested resource does not exists");
    }
    ctx.body = {
      data: item
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      error: error.message
    };
  }
};

const create = async ctx => { 
  try {
    const { body } = ctx.request;
    const item = await knex("items").insert(body);
    if (!item.length) {
      throw new Error("The resource already exists");
    }
    // Log creation event
    log(ctx, item[0]);
    // Return successful response
    ctx.status = 201;
    ctx.set("Location", `${ctx.request.URL}/${item[0]}`);
    ctx.body = {
      data: item
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: "Opps! Something went wrong creating new item."
    };
  };
};

const destroy = async ctx => {
  try {
    const { id } = ctx.params;
    const item = await knex("items")
      .where({ id })
      .del()
    // Log destroy event
    log(ctx);  
    ctx.status = 204
    ctx.body = {
      data: [id]
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      error: error.message
    };
  }
};

module.exports = { index, show, create, destroy };