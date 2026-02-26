const fs = require('fs');
const path = require('path');

const mdDetailPath = 'src/views/dashboards/MD/MDTaskDetail.jsx';
const hodDetailPath = 'src/views/dashboards/HOD/HODTaskDetail.jsx';

let mdSrc = fs.readFileSync(mdDetailPath, 'utf8');

let hodSrc = mdSrc
    // Component names and menu
    .replace(/MDTaskDetail/g, 'HODTaskDetail')
    .replace(/MDMenuItems/g, 'HODMenuItems')
    .replace(/userRole="MD"/g, 'userRole="HOD"')
    // Links
    .replace(/\/md-dashboard/g, '/hod-dashboard');

fs.writeFileSync(hodDetailPath, hodSrc);
console.log('✅ Replaced HODTaskDetail.jsx with real data logic from MDTaskDetail.jsx');
