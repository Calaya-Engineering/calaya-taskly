const fs = require('fs');

const fileToTransform = 'src/views/dashboards/HOD/HODMyTasks.jsx';
let content = fs.readFileSync(fileToTransform, 'utf8');

// Replace mock tasks completely
content = content.replace(
    /const myTasks = \[\s*\{[\s\S]*?\}\s*\];/g,
    `const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchTasks = useCallback(async () => {
    try {
      // Fetch ME to get current userId
      const meRes = await fetchWithAuth("/api/me");
      if (!meRes.ok) return;
      const me = await meRes.json();
      
      const res = await fetchWithAuth(\`/api/tasks?assigneeId=\${me.id}&limit=100\`);
      if (res.ok) {
        const data = await res.json();
        setTasksData(data);
      }
    } catch (e) {
      console.error("Failed to fetch tasks:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    let cancelled = false;
    async function connectSSE() {
      const res = await fetchWithAuth("/api/tasks/events");
      if (!res.ok || cancelled) return;
      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let buffer = "";
      try {
        while (!cancelled) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\\n\\n");
          buffer = parts.pop() || "";
          for (const part of parts) {
            const m = part.match(/^data: (.+)$/m);
            if (m) {
              try {
                const ev = JSON.parse(m[1]);
                if (ev.type?.startsWith("task:")) fetchTasks();
              } catch {}
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    }
    connectSSE();
    return () => {
      cancelled = true;
    };
  }, [fetchTasks]);`
);

// We need to add imports to HODMyTasks because we added useCallback, useEffect, fetchWithAuth
content = content.replace(
    /import \{ useMemo, useState \} from 'react';/,
    `import { useMemo, useState, useEffect, useCallback } from 'react';\nimport { fetchWithAuth } from "@/lib/api";`
);

// We need to change references to `myTasks` to `tasksData`
// But we should watch out: `const filteredTasks = useMemo(() => { let filtered = myTasks.filter(...`
content = content.replace(/myTasks/g, 'tasksData');

// Add task logic (display formatting, etc)
// task.id is now an integer, wait actually task.id works.
content = content.replace(/\{task.id\}/g, '{task.type === "JOB" ? `JOB-${task.id}` : `TSK-${task.id}`}');

fs.writeFileSync(fileToTransform, content);
console.log("Transformed HODMyTasks successfully.");
