import { Handle, Position } from "reactflow";

function TaskNode({ data }: any) {
  return (
    <div
      style={{
        padding: "12px",
        border: "2px solid #007bff",
        borderRadius: "8px",
        background: "#e6f0ff",
        minWidth: "150px",
      }}
    >
      <strong>{data.title || "Task Node"}</strong>
      <p style={{ fontSize: "12px", margin: "5px 0" }}>
        {data.description || "Task description"}
      </p>

      {/* Input */}
      <Handle type="target" position={Position.Top} />

      {/* Output */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default TaskNode;