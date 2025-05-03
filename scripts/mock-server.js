const path = require('path');
const express = require('express');

const port = 8001;


const modApp = express();

modApp.use((req, res, next) => {
    console.log(`Req[${port}]: ${req.url}`);
    next();
});

modApp.use('/', express.static(path.join(__dirname, '../public/')));
modApp.use('/static/', express.static(path.join(__dirname, '../public/')));

modApp.listen(port, 'localhost', err => {
    if (!!err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${port} --> module-tour-page`);
});
