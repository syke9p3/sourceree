import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql', // Replace 'mysql' with your database type
  database: 'playground',
  username: 'root',
  password: 'password',
  host: '127.0.0.1', // Or your database host
  port: 3306, // Or your database port
  define: {
    timestamps: false, // Set to `true` if you want Sequelize to manage timestamps
  },
});

export default sequelize;