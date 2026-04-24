import { useState } from "react";
import WorkflowCanvas from "./components/WorkflowCanvas";
import Sidebar from "./components/Sidebar";
import NodeConfigPanel from "./panels/NodeConfigPanel";
import SimulationPanel from "./panels/SimulationPanel";

function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // ✅ store last deleted (for undo)
  const [lastDeleted, setLastDeleted] = useState<any>(null);

  // ✅ NODES
  const [nodes, setNodes] = useState<any[]>([
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Start Node" },
      type: "start",
    },
    {
      id: "2",
      position: { x: 100, y: 250 },
      data: {
        title: "Collect Documents",
        description: "Upload ID proof",
      },
      type: "task",
    },
    {
      id: "3",
      position: { x: 100, y: 400 },
      data: {
        title: "Manager Approval",
        role: "Manager",
        threshold: 2,
      },
      type: "approval",
    },
    {
      id: "4",
      position: { x: 100, y: 550 },
      data: {
        title: "Send Email",
        action: "send_email",
      },
      type: "automated",
    },
  ]);

  // ✅ EDGES
  const [edges, setEdges] = useState<any[]>([
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
  ]);

  // ✅ UPDATE NODE
  const updateNode = (id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };

  // =========================
  // 🔁 FIXED UNDO FUNCTION
  // =========================
  const handleUndo = () => {
  if (!lastDeleted) return;

  // ✅ restore node safely
  setNodes((nds) => {
    const exists = nds.some((n) => n.id === lastDeleted.node.id);
    if (exists) return nds;

    return [...nds, lastDeleted.node];
  });

  // ✅ smart edge restore
  setEdges((eds) => {
    let updatedEdges = [...eds];

    lastDeleted.edges.forEach((edge: any) => {

      // 🔥 REMOVE conflicting edges
      updatedEdges = updatedEdges.filter(
        (e) =>
          e.source !== edge.source && // remove same source
          e.target !== edge.target    // remove same target
      );

      // ✅ add restored edge
      updatedEdges.push(edge);
    });

    return updatedEdges;
  });

  setLastDeleted(null);
};

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#f4f4f4" }}>
        <Sidebar />
      </div>

      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <WorkflowCanvas
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
        />
      </div>

      {/* Right Panel */}
      <div style={{ width: "300px", background: "#fafafa", padding: "10px" }}>
        
        {/* 🔁 UNDO BUTTON */}
        {lastDeleted && (
          <button
            onClick={handleUndo}
            style={{
              marginBottom: "10px",
              padding: "6px 10px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Undo Delete
          </button>
        )}

        <NodeConfigPanel
          selectedNodeId={selectedNodeId}
          nodes={nodes}
          updateNode={updateNode}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          setSelectedNodeId={setSelectedNodeId}
          setLastDeleted={setLastDeleted}
        />

        <hr />

        <SimulationPanel 
          nodes={nodes} 
          edges={edges}
        />
      </div>
    </div>
  );
}

export default App;