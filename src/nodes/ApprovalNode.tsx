import { Handle, Position } from "reactflow";

function ApprovalNode({ data }: any) {
  return (
    <div
      style={{
        padding: "12px",
        border: "2px solid orange",
        borderRadius: "8px",
        background: "#fff4e6",
        minWidth: "160px",
      }}
    >
      <strong>{data.title || "Approval"}</strong>

      <p style={{ fontSize: "12px", margin: "5px 0" }}>
        Role: {data.role || "Manager"}
      </p>

      <p style={{ fontSize: "12px" }}>
        Threshold: {data.threshold || 0}
      </p>

      {/* Input */}
      <Handle type="target" position={Position.Top} />

      {/* Output */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default ApprovalNode;