const bestSqlite = require('best-sqlite3');
const express = require('express');
const restApi = require('./rest-api');

const imageUpload = require('./image-upload');

const port = process.env.PORT || 4000;
const dbPath = '../database/db.sqlite3';



async function start() {
  const db = await bestSqlite.connect(dbPath);
  const app = express();
  app.use(express.static('dist'));
  app.use(express.json());
  imageUpload(app); // add a route for uploading images
  restApi(app, db);

  app.listen(port, () => console.log('Backend listening on http://localhost:' + port));
  
}

start();

