const fs = require('fs');

const fileToTransform = 'src/views/dashboards/HOD/HODMyTasks.jsx';
let content = fs.readFileSync(fileToTransform, 'utf8');

content = content.replace(/tasksData\.reduce\(\(acc, t\) => acc \+ t\.progress, 0\) \/ tasksData\.length/g, 
  "(tasksData.length === 0 ? 0 : tasksData.reduce((acc, t) => acc + (t.progress || 0), 0) / tasksData.length)");

content = content.replace(/summary\.total === 0 \? 0 :/g, "");
content = content.replace(/\(summary.completed \/ summary.total\)/g, "(summary.total === 0 ? 0 : summary.completed / summary.total)");


fs.writeFileSync(fileToTransform, content);
console.log("Transformed successfully.");

