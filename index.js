const express = require('express');
const { PORT, DB } = require('./config');
const { connect } = require('mongoose');
const app = express();
const cors = require('cors');
const { success, error } = require('consola');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/api/v1/', require('./routes/applicationRoutes'));
const startApp = async () => {
  try {
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    success({ message: `Successfully connected to DB ${DB}`, badge: true });

    await app.listen(PORT, () => {
      success({ message: `Server started on ${PORT}`, badge: true });
    });
  } catch (err) {
    error({
      message: 'There was some error connecting to database',
      badge: true,
    });
    startApp();
  }
};

startApp();
