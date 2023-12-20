axios.get('http://localhost:8080/employees') // Replace with your API endpoint
  .then(function (response) {
    const employees = response.data;
    const employeeTable = $('#employeeTable').DataTable({
      data: employees,
      columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: 'department' },
        { data: 'position' },
        { data: 'salary', render: $.fn.dataTable.render.number(',', '.', 2, '$') }
      ],
      "order": [[0, 'asc']] // Sort by ID in ascending order
    });
  })
  .catch(function (error) {
    console.log(error);
  });