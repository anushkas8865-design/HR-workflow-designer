import { Handle, Position } from "reactflow";

function StartNode({ data }: any) {
  return (
    <div
      style={{
        padding: "10px 15px",
        border: "2px solid green",
        borderRadius: "8px",
        background: "#eaffea",
        textAlign: "center",
        minWidth: "120px",
      }}
    >
      <strong>{data.label || "Start"}</strong>

      {/* Output connection */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default StartNode;