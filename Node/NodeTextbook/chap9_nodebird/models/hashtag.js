const Sequelize = require('sequelize')

module.exports = class Hashtag extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title : {
                type : Sequelize.STRING(14),
                allowNull : false,
                unique : true
            }
        }, {
            sequelize,
            timestamps : false,
            modelName : 'Hashtag',
            tableName : 'hashtags',
            paranoid : true,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci'
        })
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {
            through : 'PostHashtag'
        })
    }
}