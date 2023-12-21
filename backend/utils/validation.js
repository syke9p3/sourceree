
export const validateEmployeeData = (data) => {
    const { name, email, department, position, salary } = data;
    const errors = [];
  
    if (!name || typeof name !== 'string' || name.trim() === '') {
      errors.push('Name is required and must be a non-empty string.');
    }
  
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      errors.push('Email is required and must be a valid email address.');
    }
  
    if (!department || typeof department !== 'string' || department.trim() === '') {
      errors.push('Department is required and must be a non-empty string.');
    }
  
    if (!position || typeof position !== 'string' || position.trim() === '') {
      errors.push('Position is required and must be a non-empty string.');
    }
  
    if (!salary || isNaN(parseFloat(salary))) {
      errors.push('Salary is required and must be a number.');
    }
  
    return errors;
  };