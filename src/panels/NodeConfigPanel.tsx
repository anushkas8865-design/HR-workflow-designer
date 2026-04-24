import { useState } from "react";
import { useAutomations } from "../hooks/useAutomations";

function NodeConfigPanel({
  selectedNodeId,
  nodes,
  updateNode,
  setNodes,
  edges,
  setEdges,
  setSelectedNodeId,
  setLastDeleted,   // ✅ NEW
}: any) {

  const [showConfirm, setShowConfirm] = useState(false); // ✅ popup state

  const selectedNode = nodes.find((n: any) => n.id === selectedNodeId);

  const { automations } = useAutomations();

  if (!selectedNode || !updateNode) {
    return <div style={{ padding: "10px" }}>Select a node</div>;
  }

  const handleChange = (key: string, value: any) => {
    updateNode(selectedNode.id, { [key]: value });
  };

  // =========================
  // 🔴 FINAL DELETE LOGIC
  // =========================
  const confirmDelete = () => {
    if (!selectedNodeId) return;

    // ✅ capture edges before deleting
    const connectedEdges = edges.filter(
      (edge: any) =>
        edge.source === selectedNodeId ||
        edge.target === selectedNodeId
    );

    // ✅ store for undo
    setLastDeleted({
      node: selectedNode,
      edges: connectedEdges,
    });

    // remove node
    setNodes((nds: any[]) =>
      nds.filter((node) => node.id !== selectedNodeId)
    );

    // remove edges
    setEdges((eds: any[]) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNodeId &&
          edge.target !== selectedNodeId
      )
    );

    setSelectedNodeId(null);
    setShowConfirm(false);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Configure Node</h3>

      <p><strong>Type:</strong> {selectedNode.type}</p>

      {/* START NODE */}
      {selectedNode.type === "start" && (
        <>
          <input
            placeholder="Title"
            value={selectedNode.data.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
          />
        </>
      )}

      {/* TASK NODE */}
      {selectedNode.type === "task" && (
        <>
          <input
            placeholder="Title"
            value={selectedNode.data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <input
            placeholder="Description"
            value={selectedNode.data.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <input
            placeholder="Assignee"
            value={selectedNode.data.assignee || ""}
            onChange={(e) => handleChange("assignee", e.target.value)}
          />
        </>
      )}

      {/* APPROVAL NODE */}
      {selectedNode.type === "approval" && (
        <>
          <input
            placeholder="Title"
            value={selectedNode.data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <input
            placeholder="Role"
            value={selectedNode.data.role || ""}
            onChange={(e) => handleChange("role", e.target.value)}
          />
          <input
            type="number"
            placeholder="Threshold"
            value={selectedNode.data.threshold || 0}
            onChange={(e) =>
              handleChange("threshold", Number(e.target.value))
            }
          />
        </>
      )}

      {/* AUTOMATED NODE */}
      {selectedNode.type === "automated" && (
        <>
          <input
            placeholder="Title"
            value={selectedNode.data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <select
            value={selectedNode.data.action || ""}
            onChange={(e) => {
              handleChange("action", e.target.value);
              handleChange("params", {});
            }}
          >
            <option value="">Select Action</option>
            {automations.map((auto: any) => (
              <option key={auto.id} value={auto.id}>
                {auto.label}
              </option>
            ))}
          </select>

          {selectedNode.data.action &&
            automations
              .find((a: any) => a.id === selectedNode.data.action)
              ?.params.map((param: string) => (
                <input
                  key={param}
                  placeholder={param}
                  value={selectedNode.data.params?.[param] || ""}
                  onChange={(e) =>
                    handleChange("params", {
                      ...selectedNode.data.params,
                      [param]: e.target.value,
                    })
                  }
                />
              ))}
        </>
      )}

      {/* ========================= */}
      {/* 🚫 DISABLE DELETE FOR START */}
      {/* ========================= */}
      {selectedNode.type !== "start" && (
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            marginTop: "10px",
            padding: "6px 10px",
            background: "red",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Delete Node
        </button>
      )}

      {/* ========================= */}
      {/* 🧾 CUSTOM CONFIRM POPUP */}
      {/* ========================= */}
      {showConfirm && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            background: "#fff",
          }}
        >
          <p>Are you sure you want to delete this node?</p>

          <button
            onClick={confirmDelete}
            style={{
              marginRight: "10px",
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
          >
            Delete
          </button>

          <button
            onClick={() => setShowConfirm(false)}
            style={{
              padding: "5px 10px",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default NodeConfigPanel;