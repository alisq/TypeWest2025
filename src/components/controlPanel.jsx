import React, { useEffect, useRef, useState } from "react";
import {ReactComponent as Chevron } from "../chevron.svg";

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
    <div className="control-panel hide-small">
      
      {versions?.length > 0 && (
        <div className="control-group">
          <div className="dropdown" ref={dropdownRef}>
            <div
              type="button"
              className="dropdown-trigger"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              <span className="dropdown-value">
                {fontName} {activeVersion}
              </span>
              <span className="chevron" aria-hidden="true">
                <Chevron />
              </span>
            </div>

            {open && (
              <ul className="dropdown-menu" role="listbox">
                {versions.map((version) => (
                  <li
                    key={version}
                    role="option"
                    aria-selected={version === activeVersion}
                    className={`dropdown-item ${
                      version === activeVersion ? "is-active" : ""
                    }`}
                    onClick={() => {
                      stripSpecimenSpans();
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

      {/* <div className="sliders"> */}
      <div className="slider-container">
        <input
          className="slider"
          type="range"
          min="1"
          max="20"
          step="0.25"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <div className="small">
          Size: <strong>{fontSize}vw</strong>
        </div>
      </div>

      {/* LEADING */}
      <div className="slider-container">
        <input
          className="slider"
          type="range"
          min="0.8"
          max="2"
          step="0.25"
          value={leading}
          onChange={(e) => setLeading(e.target.value)}
        />
        <div className="small">
          Line Height: <strong>{leading / 10}</strong>
        </div>
      </div>

      {/* TRACKING */}
      <div className="slider-container">
        <input
          className="slider"
          type="range"
          min="-20"
          max="100"
          step="0.1"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
        />
        <div className="small">
          Tracking: <strong>{tracking}%</strong>
        </div>
      </div>
      {/* </div> */}

      {/* ALIGNMENT */}
      <div className="medium-span-2 medium-center">
        {["left", "center", "right"].map((align) => (
          <div
            key={align}
            className={`text-align align-${align} ${
              activeOrientation === align ? "is-active" : ""
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


const stripSpecimenSpans = () => {
  document
    .querySelectorAll(".specimen-text-long span")
    .forEach(span => {
      span.replaceWith(...span.childNodes);
    });
};