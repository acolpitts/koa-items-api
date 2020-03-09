const env = process.env.NODE_ENV || "test";
const config = require("../knexfile")[env];
const server = require("../server/index");
const knex = require("knex")(config);
const PATH = "/api/v1/items";

const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("routes: items", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe(`GET ${PATH}`, () => {
    it("should return all the resources", done => {
      chai
        .request(server)
        .get(`${PATH}`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.data.length.should.eql(5);
          res.body.data[0].should.include.keys("id", "title", "column");
          done();
        });
    });
  });

  describe(`GET ${PATH}/:id`, () => {
    it("should return a single resource", done => {
      chai
        .request(server)
        .get(`${PATH}/1`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.data.length.should.eql(1);
          res.body.data[0].should.include.keys("id", "title", "column");
          done();
        });
    });
    it("should return an error when the requested resource does not exists", done => {
      chai
        .request(server)
        .get(`${PATH}/9999`)
        .end((err, res) => {
          should.exist(err);
          res.status.should.eql(404);
          res.type.should.eql("application/json");
          res.body.error.should.eql("The requested resource does not exists");
          done();
        });
    });
  });
});