import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../sequelize.js'

const Employee = sequelize.define("Employee" , {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },

})

export default Employee