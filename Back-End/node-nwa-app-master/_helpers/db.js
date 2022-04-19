const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');


 





module.exports = db = {};

initialize(); 

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    
    db.User = require('../Models/user.model')(sequelize);
    db.Marker = require('../Models/marker.model')(sequelize);
    db.Company = require('../Models/company.model')(sequelize);
    db.Type = require('../Models/type.model')(sequelize);
    db.RefreshToken = require('../Models/refresh-token.model')(sequelize);
    
    // relationships
    db.User.hasMany(db.Marker,{onDelete:'CASCADE',onUpdate:'CASCADE'});
    db.Marker.belongsTo(db.User);
    db.Marker.belongsTo(db.Type);
    db.Company.hasMany(db.Type,{onUpdate:'CASCADE'});
    db.Type.hasMany(db.Marker,{onDelete:'CASCADE',onUpdate:'CASCADE'});
    db.Type.belongsTo(db.Company);
    db.User.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.User);

    // sync all models with database
    await sequelize.sync({ alter: true });
}