function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Nodes</h3>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "start")}
        style={itemStyle}
      >
        Start Node
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "task")}
        style={itemStyle}
      >
        Task Node
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "approval")}
        style={itemStyle}
      >
        Approval Node
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "automated")}
        style={itemStyle}
      >
        Automated Node
      </div>

      <div
        draggable
        onDragStart={(e) => onDragStart(e, "end")}
        style={itemStyle}
      >
        End Node
      </div>
    </div>
  );
}

const itemStyle = {
  padding: "8px",
  margin: "8px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "grab",
  background: "#fff",
};

export default Sidebar;