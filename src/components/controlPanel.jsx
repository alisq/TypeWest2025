function ControlPanel({
  fontSize,
  setFontSize,
  leading,
  setLeading,
  tracking,
  setTracking,
  activeOrientation,
  setActiveOrientation,
  versions,
  fontName,
  activeVersion,
  setActiveVersion
}) {
  return (
    <div className="control_panel">

      {/* VERSION SELECT */}
      {versions?.length > 0 && (
        <div className="control_group">
          
          <select
            value={activeVersion}
            onChange={(e) => setActiveVersion(e.target.value)}
          >
            {versions.map((version) => (
              <option key={version} value={version}>
                {fontName+" "+version}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* FONT SIZE */}
      <div>
        <input
          className="slider"
          type="range"
          min="30"
          max="250"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
        <div className="left">
          Size: <strong>{fontSize}px</strong>
        </div>
      </div>

      {/* LEADING */}
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

      {/* TRACKING */}
      <div>
        <input
          className="slider"
          type="range"
          min="-20"
          max="100"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
        />
        <div className="left">
          Tracking: <strong>{tracking}%</strong>
        </div>
      </div>

      {/* ALIGNMENT */}
      <div>
        {["left", "center", "right"].map((align) => (
          <div
            key={align}
            className={`text_align ${align} ${
              activeOrientation === align ? "active" : ""
            }`}
            onClick={() => setActiveOrientation(align)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ControlPanel;