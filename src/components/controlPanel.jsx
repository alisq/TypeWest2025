import React, { useEffect, useRef, useState } from "react";

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
  setActiveVersion,
}) {
  // ----- Custom dropdown state -----
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click / escape
  useEffect(() => {
    const onMouseDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="control_panel">
      {/* VERSION SELECT (fully styleable) */}
      {versions?.length > 0 && (
        <div className="control_group">
          <div className="dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="dropdownTrigger"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <span className="dropdownValue">
                {fontName} {activeVersion}
              </span>
              <span className="chevron" aria-hidden="true">
                ^
              </span>
            </button>

            {open && (
              <ul className="dropdownMenu" role="listbox">
                {versions.map((version) => (
                  <li
                    key={version}
                    role="option"
                    aria-selected={version === activeVersion}
                    className={`dropdownItem ${
                      version === activeVersion ? "active" : ""
                    }`}
                    onClick={() => {
                      setActiveVersion(version);
                      setOpen(false);
                    }}
                  >
                    {fontName} {version}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
          onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActiveOrientation(align);
            }}
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
