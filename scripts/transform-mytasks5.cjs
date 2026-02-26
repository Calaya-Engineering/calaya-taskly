const fs = require('fs');

const fileToTransform = 'src/views/dashboards/HOD/HODMyTasks.jsx';
let content = fs.readFileSync(fileToTransform, 'utf8');

// The replacement was failing because the regex match wasn't picking it up, probably due to formatting.
// Let's replace the whole top block directly using index.

const startStr = "const tasksData = [";
const endStr = "];";

const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + 
  `const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchTasks = useCallback(async () => {
    try {
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
  }, [fetchTasks]);` + content.substring(endIdx + endStr.length);
  
  fs.writeFileSync(fileToTransform, content);
  console.log("Transformed successfully.");
} else {
  console.log("Could not find start/end.");
}
