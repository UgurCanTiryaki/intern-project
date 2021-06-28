const express = require('express');

const sequelize = require('./config/database');
const { errorHandler, notFound } = require('./controllers/error');

const app = express();

app.use(notFound);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(8080);
}).catch((error) => {
  console.log(error);
});
