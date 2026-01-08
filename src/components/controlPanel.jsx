

function ControlPanel({
  fontSize,
  setFontSize,
  leading,
  setLeading,
  activeOrientation,
  setActiveOrientation,
}) {
  return (
    <div className="control_panel">
      <div className="control_interior">
        <input
          className="slider"
          type="range"
          min="14"
          max="150"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
        <div className="left">
          Size: <strong>{fontSize}px</strong>
        </div>
        <input
          className="slider"
          type="range"
          min="8"
          max="20"
          value={leading}
          onChange={(e) => setLeading(e.target.value)}
        />

        <div className="left">
          Line Height: <strong>{leading / 10}</strong>
        </div>

        <div
          className={`text_align left ${
            activeOrientation === "left" ? "active" : ""
          }`}
          onClick={() => setActiveOrientation("left")}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div
          className={`text_align center ${
            activeOrientation === "center" ? "active" : ""
          }`}
          onClick={() => setActiveOrientation("center")}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <div
          className={`text_align right ${
            activeOrientation === "right" ? "active" : ""
          }`}
          onClick={() => setActiveOrientation("right")}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;