import { useEffect } from "react";

function ImageModal({ image, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <img
          src={image.image.asset.url}
          alt={image.alt || ""}
        />

        {image.caption && <p>{image.caption}</p>}
      
    </div>
  );
}

export default ImageModal;
