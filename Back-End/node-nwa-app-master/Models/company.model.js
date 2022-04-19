const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        companyname: { type: DataTypes.STRING, allowNull: false },
        mobile:{type: DataTypes.INTEGER(11), allowNull: false},
        role: { type: DataTypes.STRING, allowNull: false }
        
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Company', attributes, options);
    
}