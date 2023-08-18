const mongose = require("mongoose");
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
  mongose.set("strictQuery", false);
  mongose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;
