const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Cliente', {
        idCliente : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        NomeFantasia : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        cnpj : {
            type : Sequelize.STRING(14),
            allowNull : false
        },
        RazaoSocial : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        dataCliente : {
            type : Sequelize.DATE(),
            allowNull : false
        }
    })
}