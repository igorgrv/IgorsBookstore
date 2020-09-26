require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const template = require('../app/views/template');

app.use('/static', express.static('src/app/public'));

const routes = require('../app/routes/routes');
routes(app);

app.use((req, res, next) => res.status(404).marko(template.base.erro404));
app.use((error, req, res, next) => res.status(500).marko(template.base.erro500));

module.exports = app;