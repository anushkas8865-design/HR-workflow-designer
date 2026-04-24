import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import StartNode from "../nodes/StartNode";
import TaskNode from "../nodes/TaskNode";
import ApprovalNode from "../nodes/ApprovalNode";
import AutomatedNode from "../nodes/AutomatedNode";
import EndNode from "../nodes/EndNode";

// ✅ keep nodeTypes outside
const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

function WorkflowCanvas({
  nodes,
  setNodes,
  edges,
  setEdges,
  selectedNodeId,       // ✅ NEW
  setSelectedNodeId,
}: any) {

  // =========================
  // 🔴 DELETE NODE LOGIC
  // =========================
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Delete" && selectedNodeId) {
        // ✅ Remove node
        setNodes((nds: any) =>
          nds.filter((node: any) => node.id !== selectedNodeId)
        );

        // ✅ Remove connected edges
        setEdges((eds: any) =>
          eds.filter(
            (edge: any) =>
              edge.source !== selectedNodeId &&
              edge.target !== selectedNodeId
          )
        );

        // ✅ Clear selection
        setSelectedNodeId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNodeId, setNodes, setEdges, setSelectedNodeId]);

  // =========================
  // CONNECT EDGES
  // =========================
  const onConnect = (params: any) => {
    const { source, target } = params;

    if (source === target) {
      alert("Cannot connect node to itself");
      return;
    }

    const hasOutgoing = edges.some((e: any) => e.source === source);
    if (hasOutgoing) {
      alert("This node already has an outgoing connection");
      return;
    }

    const hasIncoming = edges.some((e: any) => e.target === target);
    if (hasIncoming) {
      alert("This node already has an incoming connection");
      return;
    }

    setEdges((eds: any) => addEdge(params, eds));
  };

  // =========================
  // NODE SELECTION
  // =========================
  const onSelectionChange = ({ nodes }: any) => {
    if (nodes.length > 0) {
      setSelectedNodeId(nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  };

  // =========================
  // DRAG OVER
  // =========================
  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // =========================
  // DROP NEW NODE
  // =========================
  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    if (type === "start" && nodes.some((n: any) => n.type === "start")) {
      alert("Only one Start node allowed");
      return;
    }

    if (type === "end" && nodes.some((n: any) => n.type === "end")) {
      alert("Only one End node allowed");
      return;
    }

    const position = {
      x: event.clientX - 250,
      y: event.clientY,
    };

    const newNode = {
      id: (nodes.length + 1).toString(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds: any) => [...nds, newNode]);
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds: any) => applyNodeChanges(changes, nds))
        }
        onEdgesChange={(changes) =>
          setEdges((eds: any) => applyEdgeChanges(changes, eds))
        }
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={onSelectionChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default WorkflowCanvas;