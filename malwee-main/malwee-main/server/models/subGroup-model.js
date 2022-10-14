const { Sequelize } = require("sequelize");
const  groupModels = require("./group-model");
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
        },
        fkGroup : {
            type : Sequelize.INTEGER.UNSIGNED,
            references: 'grupos',
            referencesKey: 'idGrupo'
        }
        
    })
    groupModels.grupo.hasMany(subGrupos, {foreignKey: "fkGroup"})
}