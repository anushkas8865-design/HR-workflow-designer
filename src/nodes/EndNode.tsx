import { Handle, Position } from "reactflow";

function EndNode({ data }: any) {
  return (
    <div
      style={{
        padding: "12px",
        border: "2px solid red",
        borderRadius: "8px",
        background: "#ffe6e6",
        minWidth: "150px",
        textAlign: "center",
      }}
    >
      <strong>{data.label || "End Node"}</strong>

      <p style={{ fontSize: "12px", marginTop: "5px" }}>
        {data.message || "Workflow Complete"}
      </p>

      {/* Only input handle (no output) */}
      <Handle type="target" position={Position.Top} />
    </div>
  );
}

export default EndNode;