const {Sequelize, DataTypes} = require('sequelize');
//const sequelize = new Sequelize('mysql://user:user@localhost:3306/cybersecurity');

const sequelize = new Sequelize('cybersecurity', 'user', 'user', {
    dialect: 'mysql',
    host: "localhost",
    port: 3306
})


const User = sequelize.define('User',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING(40),
            required: true,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
        account: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING(100),
            required: true
        }
    },
    {
        tableName: 'user',
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false
    },
);
User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// Create all the defined tables in the specified database
User.sync({force: true}).then(() => console.log('Table \'' + User.tableName + '\' has been successfully created.')).catch(error => console.log('The following error occured: ', error));
module.exports = User;