const express = require("express");
const { PORT } = require("./config/index");
const app = express();
const cors = require("cors");
const { success, error } = require("consola");
const passport = require("passport");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/error");
connectDb();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
require("./middlewares/auth")(passport);
app.use("/api/v1/users", require("./routes/auth"));
app.use(errorHandler);

const server = app.listen(PORT, () => {
  success({ message: `Server started on ${PORT}`, badge: true });
});

process.on("unhandledRejection", (err, promise) => {
  error({ message: err });
  server.close(() => process.exit(1));
});
