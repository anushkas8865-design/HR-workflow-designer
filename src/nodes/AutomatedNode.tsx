import { Handle, Position } from "reactflow";

function AutomatedNode({ data }: any) {
  return (
    <div
      style={{
        padding: "12px",
        border: "2px solid purple",
        borderRadius: "8px",
        background: "#f3e6ff",
        minWidth: "170px",
      }}
    >
      <strong>{data.title || "Automated Step"}</strong>

      <p style={{ fontSize: "12px", margin: "5px 0" }}>
  Action: {data.action || "None"}
</p>

{/* Show Params */}
{data.params &&
  Object.entries(data.params).map(([key, value]: any) => (
    <p key={key} style={{ fontSize: "11px", margin: "2px 0" }}>
      {key}: {value}
    </p>
  ))}

      {/* Input */}
      <Handle type="target" position={Position.Top} />

      {/* Output */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default AutomatedNode;