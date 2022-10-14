const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Cliente', {
        idProduto : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descricao : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        preco : {
            type : Sequelize.STRING(14),
            allowNull : false
        },
        fkSubGrupo : {
            type : Sequelize.INTEGER.UNSIGNED,
            references: 'subGrupos',
            referencesKey: 'idSub'
        },
        fkGrupo : {
            type : Sequelize.INTEGER.UNSIGNED,
            references: 'grupos',
            referencesKey: 'idGrupo'
        },
        fkColecao: {
            type : Sequelize.INTEGER.UNSIGNED,
            references: 'colecao',
            referencesKey: 'idColecao'
        }
        
    })
}