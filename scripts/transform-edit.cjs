const fs = require('fs');
const path = require('path');

// 1. Generate HODEditTask.jsx
const mdEditPath = 'src/views/dashboards/MD/MDEditTask.jsx';
const hodEditPath = 'src/views/dashboards/HOD/HODEditTask.jsx';

let mdSrc = fs.readFileSync(mdEditPath, 'utf8');

let hodSrc = mdSrc
    // Component names and menu
    .replace(/MDEditTask/g, 'HODEditTask')
    .replace(/MDMenuItems/g, 'HODMenuItems')
    .replace(/userRole="MD"/g, 'userRole="HOD"')
    // Links
    .replace(/\/md-dashboard/g, '/hod-dashboard');

fs.writeFileSync(hodEditPath, hodSrc);
console.log('✅ Created HODEditTask.jsx');

// 2. Create the Next.js app page
const pagePathDir = 'src/app/hod-dashboard/edit-task/[taskId]';
const pagePath = path.join(pagePathDir, 'page.jsx');

if (!fs.existsSync(pagePathDir)) {
    fs.mkdirSync(pagePathDir, { recursive: true });
}

const pageContent = `import HODEditTask from "../../../../views/dashboards/HOD/HODEditTask";

export default function Page() {
  return <HODEditTask />;
}
`;

fs.writeFileSync(pagePath, pageContent);
console.log('✅ Created edit-task route for HOD');
