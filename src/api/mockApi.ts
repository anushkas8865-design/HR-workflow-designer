export const getAutomations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "send_email",
          label: "Send Email",
          params: ["to", "subject"],
        },
        {
          id: "generate_doc",
          label: "Generate Document",
          params: ["template", "recipient"],
        },
      ]);
    }, 300);
  });
};

export const simulateWorkflow = async (workflow: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const steps: string[] = [];

      const { nodes, edges } = workflow;

      // ✅ find start node
      const startNode = nodes.find((n: any) => n.type === "start");
      if (!startNode) {
        resolve({ success: false, steps: ["No Start Node found"] });
        return;
      }

      let currentNode = startNode;
      const visited = new Set(); // prevent infinite loops

      // ✅ follow graph step-by-step
      while (currentNode && !visited.has(currentNode.id)) {
        visited.add(currentNode.id);

        // ✅ add step
        if (currentNode.type === "start") {
          steps.push("Start Node");
        } else if (currentNode.type === "task") {
          steps.push(`Task: ${currentNode.data.title}`);
        } else if (currentNode.type === "approval") {
          steps.push(`Approval: ${currentNode.data.title}`);
        } else if (currentNode.type === "automated") {
          steps.push(`Automated: ${currentNode.data.action}`);
        } else if (currentNode.type === "end") {
          steps.push("End Node");
          break; // 🔥 stop at end
        }

        // ✅ find next edge
        const nextEdge = edges.find(
          (e: any) => e.source === currentNode.id
        );

        if (!nextEdge) break;

        // ✅ move to next node
        currentNode = nodes.find(
          (n: any) => n.id === nextEdge.target
        );
      }

      resolve({
        success: true,
        steps,
      });
    }, 500);
  });
};