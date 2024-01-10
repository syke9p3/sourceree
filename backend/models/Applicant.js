import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../sequelize.js'

const ALLOWED_CIVIL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
const ALLOWED_SEX = ["Male", "Female", "Preferred not to disclose"];

const Applicant = sequelize.define("Applicant" , {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthMonth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDay:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    birthYear:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    civilStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [ALLOWED_CIVIL_STATUSES],
        },
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [ALLOWED_SEX],
        },
    },
    contact:{
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
    altEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    homeAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    highestEducationalAttainment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastSchoolAttended: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bpoExpYears:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bpoExpPosition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endorsementDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    interviewTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resume:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Applicant;