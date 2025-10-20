const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require('morgan');

const app = express();

// Use morgan with an explicit stream to ensure logs go to stdout when running via npm start
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, { stream: process.stdout }));

let port = 3000;
app.set('port', port);

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());

function loadRoutes() {
    const modulesPath = path.join(__dirname, 'modules');

    fs.readdirSync(modulesPath).forEach((folder) => {
        const folderPath = path.join(modulesPath, folder);

        if (fs.lstatSync(folderPath).isDirectory()) {
            const routeFilePath = path.join(folderPath, 'route.js');

            if (fs.existsSync(routeFilePath)) {
                const prefix = `/${folder}`;
                const { router } = require(routeFilePath);
                
                app.use(prefix, router);

                console.log('Modulo cargado:', prefix)
            }
        }
    });
};

loadRoutes();

app.use('/', (req, res) => res.send('Bienvenido a mi api'));

module.exports = {
    app
}