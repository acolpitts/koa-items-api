// Update with your config settings.
  
const path = require("path");
const BASE_PATH = path.join(__dirname, "server", "db");

module.exports = {
  test: {
    client: "sqlite3",
    connection: {
      filename: "./test.sqlite3"
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    },
    useNullAsDefault: true
  },
  dev: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3"
    },
    migrations: {
      directory: path.join(BASE_PATH, "migrations")
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds")
    },
    useNullAsDefault: true
  }
};
