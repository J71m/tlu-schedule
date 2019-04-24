const express = require('express');
const cors = require('cors')
const scheduleRoute = require('./routes/scheduleRoute');

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.get('*', scheduleRoute);
app.post('*', scheduleRoute);

app.listen(6969);
