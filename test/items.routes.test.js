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
          res.body.data[0].title.should.equal('item 1');
          res.body.data[0].column.should.equal(0);
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
          should.not.exist(err);
          res.status.should.eql(404);
          res.type.should.eql("application/json");
          res.body.error.should.eql("The requested resource does not exists");
          done();
        });
    });
  });

  describe(`POST ${PATH}`, () => {
    it("should return the newly added resource identifier with a Location header", done => {
      chai
        .request(server)
        .post(`${PATH}`)
        .send({
          title: "A test item",
          column: 0
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(201);
          res.should.have.header("Location");
          res.type.should.eql("application/json");
          res.body.data.length.should.eql(1);
          res.body.data[0].should.be.a("number");
          done();
        });
    });
    it("should require valid payload", done => {
      chai
        .request(server)
        .post(`${PATH}`)
        .send({
          title: "A test item without column prop"
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(400);
          res.type.should.eql("application/json");
          res.body.error.should.eq('Opps! Something went wrong creating new item.');
          done();
        });
    });
  });

  describe(`DELETE ${PATH}/:id`, () => {
    it("should delete a given resource", done => {
      chai
        .request(server)
        .del(`${PATH}/1`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(204);
          done();
        });
    });
  });
});