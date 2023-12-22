import mysql from 'mysql2';

export const connectToMySQL = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'playground'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
    }
    console.log('Connected to MySQL!');
  });

  return connection;
};