const { connect } = require("mongoose");
const { success } = require("consola");
const { DB } = require("./index");

const connectDb = async () => {
  await connect(DB, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
    .then(() => {
      success({ message: `Successfully connected to DB ${DB}`, badge: true });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDb;
