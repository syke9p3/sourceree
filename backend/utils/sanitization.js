export const sanitizeEmployeeData = (data) => {
    const { name, email, department, position, salary } = data;

    // Sanitize and prepare the data for the database operation
    const sanitizedEmployee = {
        name: name ? String(name).trim() : null,
        email: email ? String(email).trim() : null,
        department: department ? String(department).trim() : null,
        position: position ? String(position).trim() : null,
        salary: salary ? parseFloat(salary) : null // Assuming salary is a number
    };

    return sanitizedEmployee;
};
