const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.cursosPath = '/api/cursos';
        this.alumnosPath = '/api/alumnos';
        this.maestrosPath = '/api/maestros';
        this.authPath = '/api/auth';

        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.maestrosPath, require('../routes/maestro.routes'));
        this.app.use(this.alumnosPath, require('../routes/alumno.routes'));
        this.app.use(this.cursosPath, require('../routes/cursos.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        });
    }

}

module.exports = Server;

