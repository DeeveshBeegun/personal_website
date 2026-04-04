import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#0070f3" : "#111",
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
});

export default function Header() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const showLinks = !isMobile || isMenuOpen;

  const handleMobileLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header style={{ marginBottom: "24px" }}>
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "8px",
          }}
        >
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            style={{
              border: "1px solid #ddd",
              backgroundColor: "#f8f6f0",
              borderRadius: "8px",
              padding: "8px 10px",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
            }}
          >
            {isMenuOpen ? "X" : "☰"}
          </button>
        </div>
      )}
      <nav
        style={{
          display: showLinks ? "flex" : "none",
          gap: "16px",
          flexWrap: isMobile ? "nowrap" : "wrap",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "center",
          backgroundColor: "#f8f6f0",
          padding: "12px 16px",
          borderRadius: "10px",
        }}
      >
        <NavLink to="/about" style={linkStyle} onClick={handleMobileLinkClick}>
          About
        </NavLink>
        <NavLink
          to="/projects"
          style={linkStyle}
          onClick={handleMobileLinkClick}
        >
          Projects
        </NavLink>
        <NavLink to="/book" style={linkStyle} onClick={handleMobileLinkClick}>
          Books
        </NavLink>
        <NavLink
          to="/writing"
          style={linkStyle}
          onClick={handleMobileLinkClick}
        >
          Writing
        </NavLink>
        <NavLink
          to="/machine-learning-playground"
          style={linkStyle}
          onClick={handleMobileLinkClick}
        >
          ML Playground
        </NavLink>
        <NavLink
          to="/algorithms-playground"
          style={linkStyle}
          onClick={handleMobileLinkClick}
        >
          Algorithms
        </NavLink>
        <NavLink
          to="/sandbox"
          style={linkStyle}
          onClick={handleMobileLinkClick}
        >
          Sandbox
        </NavLink>
      </nav>
    </header>
  );
}
