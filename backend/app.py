from flask import Flask, jsonify, request, abort
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Connection
mysqlConnection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='playground'
)

if mysqlConnection.is_connected():
    print('Connected to MySQL!')

# GET all employees
@app.route('/employees', methods=['GET'])
def get_employees():
    try:
        query = 'SELECT * FROM employees'
        cursor = mysqlConnection.cursor(dictionary=True)
        cursor.execute(query)
        results = cursor.fetchall()
        return jsonify(results)
    except Exception as e:
        print(f"Error fetching employees: {str(e)}")
        return jsonify({'error': 'Error fetching employees'}), 500  # Server error response

# POST a new employee
@app.route('/employees', methods=['POST'])
def add_employee():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        department = data.get('department')
        position = data.get('position')
        salary = data.get('salary')

        if not all([name, email, department, position, salary]):
            return jsonify({'error': 'Incomplete data provided'}), 400
        
        query = 'INSERT INTO employees (name, email, department, position, salary) VALUES (%s, %s, %s, %s, %s)'
        values = (name, email, department, position, salary)

        cursor = mysqlConnection.cursor()
        cursor.execute(query, values)
        mysqlConnection.commit()

        return jsonify({'message': 'Employee created successfully', 'id': cursor.lastrowid}), 201
    except Exception as e:
        app.logger.error(f"Error creating employee: {str(e)}")
        return jsonify({'error': 'Error creating employee'}), 500


# ... Other routes and functions ...

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)