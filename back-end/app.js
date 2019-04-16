const express = require('express');
const cors = require('cors')
const scheduleRoute = require('./routes/scheduleRoute');

const app = express();

app.use(cors())
app.get('*', scheduleRoute);

app.listen(8080);
