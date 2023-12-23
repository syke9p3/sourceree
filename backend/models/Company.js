import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../sequelize.js'

const Company = sequelize.define("Company" , {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default Company