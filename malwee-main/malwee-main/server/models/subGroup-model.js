const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('SubGrupo', {
        idSub : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        tipoProduto : {
            type : Sequelize.STRING(50),
            allowNull : false,
        }
    })
}