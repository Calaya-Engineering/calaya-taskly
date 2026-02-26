const fs = require('fs');

const mdSrc = fs.readFileSync('src/views/dashboards/MD/MDAllTasks.jsx', 'utf8');

let hodSrc = mdSrc
  // Component names and menu
  .replace(/MDAllTasks/g, 'HODAllTasks')
  .replace(/MDMenuItems/g, 'HODMenuItems')
  .replace(/userRole="MD"/g, 'userRole="HOD"')
  // Links
  .replace(/\/md-dashboard/g, '/hod-dashboard')
  // Text adaptations
  .replace('Company-wide Tasks', 'Department Tasks')
  .replace('All Tasks & Jobs', 'Department Tasks')
  .replace('View, filter and monitor tasks across every department with priority, status and due dates.', 'Manage and track all tasks across your departments with priority, status and due dates.');

fs.writeFileSync('src/views/dashboards/HOD/HODAllTasks.jsx', hodSrc);
console.log("Transformation completed successfully.");
