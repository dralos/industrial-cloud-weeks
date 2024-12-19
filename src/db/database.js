const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;
const dbName = "industrial-cloud"

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let database;

const connectToDb = async () => {
  if (database) {
    return database;
  }
  try {
    database = client.db(dbName);
    return database;
  } finally {
    // await client.close();
  }
};

module.exports = connectToDb;