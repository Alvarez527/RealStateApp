

const {config} = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//Esta URL se agrega para ocultar informacion importante de la base de datos desde un archivo config
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {

  development: {
    url: URI,
    dialect: 'postgres',

  },
  productioin: {
    url: URI,
    dialect: 'postgres',

  }

}
