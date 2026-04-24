import { useState } from "react";
import { simulateWorkflow } from "../api/mockApi";

function SimulationPanel({ nodes, edges }: any) {
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ BASIC VALIDATION
  const validateWorkflow = () => {
    const startNodes = nodes.filter((n: any) => n.type === "start");
    const endNodes = nodes.filter((n: any) => n.type === "end");

    if (startNodes.length !== 1) {
      alert("Workflow must have exactly 1 Start node");
      return false;
    }

    if (endNodes.length !== 1) {
      alert("Workflow must have exactly 1 End node");
      return false;
    }

    if (edges.length === 0) {
      alert("Connect nodes before simulation");
      return false;
    }

    return true;
  };

  // ✅ GET CONNECTED NODES
  const getConnectedNodes = (nodes: any[], edges: any[]) => {
    const start = nodes.find((n: any) => n.type === "start");
    if (!start) return [];

    const visited = new Set<string>();
    const queue: string[] = [start.id];

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current || visited.has(current)) continue;

      visited.add(current);

      // ✅ FIX: added explicit type
      const nextEdges = edges.filter((e: any) => e.source === current);

      nextEdges.forEach((e: any) => queue.push(e.target));
    }

    return nodes.filter((n: any) => visited.has(n.id));
  };

  const runSimulation = async () => {
    if (!validateWorkflow()) return;

    setLoading(true);

    // ✅ FILTER CONNECTED NODES
    const connectedNodes = getConnectedNodes(nodes, edges);

    // ✅ FIX: added explicit type for 'e'
    const connectedEdges = edges.filter(
      (e: any) =>
        connectedNodes.some((n: any) => n.id === e.source) &&
        connectedNodes.some((n: any) => n.id === e.target)
    );

    const workflow = {
      nodes: connectedNodes,
      edges: connectedEdges,
    };

    try {
      const res: any = await simulateWorkflow(workflow);
      setSteps(res.steps || []);
    } catch (err) {
      console.error(err);
      alert("Simulation failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Workflow Simulation</h3>

      <button onClick={runSimulation}>
        {loading ? "Running..." : "Run Simulation"}
      </button>

      <div style={{ marginTop: "10px" }}>
        {steps.map((step, index) => (
          <p key={index}>{step}</p>
        ))}
      </div>
    </div>
  );
}

export default SimulationPanel;