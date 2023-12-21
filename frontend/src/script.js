// Function to update the employee table
const updateEmployeeTable = () => {
    axios.get('http://localhost:8080/api/employees')
        .then(function (response) {
            const employees = response.data;
            const employeeTable = $('#employeeTable').DataTable();
            
            // Clear existing data from the table and add new data
            employeeTable.clear().rows.add(employees).draw();
        })
        .catch(function (error) {
            console.log(error);
        });
};

// Function to handle form submission for adding an employee
const addEmployee = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employeeData = Object.fromEntries(formData.entries());

    axios.post('http://localhost:8080/api/employees/', employeeData)
        .then((response) => {
            console.log('Employee added successfully:', response.data);
            const modalId = event.target.closest('.modal').id;
            toggleModal(modalId); // Close the modal after successful submission
            updateEmployeeTable(); // Update the table with new data
        })
        .catch((error) => {
            console.error('Error adding employee:', error.response.data);
            // Handle errors, show error messages, etc.
        });
};

// Event listener for form submission in the addEmployeeModal
const addEmployeeForm = document.getElementById('addEmployeeForm');
if (addEmployeeForm) {
    addEmployeeForm.addEventListener('submit', addEmployee);
}

// Initial table setup on page load
$(document).ready(function () {
    updateEmployeeTable(); // Fetch and display employee data in the table
});