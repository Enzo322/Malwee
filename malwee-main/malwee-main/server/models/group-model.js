const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Grupo', {
        idGrupo : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        produto : {
            type : Sequelize.STRING(50),
            allowNull : false,
        },
        descricao : {
            type : Sequelize.STRING(200),
            allowNull : false
        }
    })
}