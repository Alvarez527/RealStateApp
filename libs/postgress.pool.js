


const { Pool } = require('pg');

const {config} = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//Esta URL se agrega para ocultar informacion importante de la base de datos desde un archivo config
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const pool = new Pool({connectionString: URI});



/*  const pool = new Pool({

    host: 'localhost',
    port: 5432,
    user: 'nico',
    password: 'admin123',
    database: 'my_store'
  });*/

module.exports = pool;
