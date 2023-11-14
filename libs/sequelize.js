
const {Sequelize} = require('sequelize');
const {config} = require('./../config/config');
const setupModels = require('../db/models/index')


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
//Esta URL se agrega para ocultar informacion importante de la base de datos desde un archivo config
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setupModels(sequelize);

//sequelize.sync(); //leera los modelos y sincronizara con la estructura de la base de datos. se bloquea para ejecutar por migracion

module.exports = sequelize;
