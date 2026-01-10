

function ControlPanel({
  fontSize,
  setFontSize,
  leading,
  setLeading,
  tracking,
  setTracking,
  activeOrientation,
  setActiveOrientation,
}) {
  return (
    <div className="control_panel">
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <input
          className="slider"
          type="range"
          min="0"
          max="100"
          value={tracking}
          onChange={(e) => setTracking((e.target.value-20)/200)}
        />
        <div className="left">
          Tracking: <strong>{tracking}%</strong>
        </div>
           </div>
      <div>

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