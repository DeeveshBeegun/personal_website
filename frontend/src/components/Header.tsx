import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? "#0070f3" : "#111",
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
});

export default function Header() {
  return (
    <header style={{ marginBottom: "24px" }}>
      <nav
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "#f8f6f0",
          padding: "12px 16px",
          borderRadius: "10px",
        }}
      >
        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>
        <NavLink to="/projects" style={linkStyle}>
          Current Project
        </NavLink>
        <NavLink to="/book" style={linkStyle}>
          Current Book
        </NavLink>
        <NavLink to="/writing" style={linkStyle}>
          Writing
        </NavLink>
        <NavLink to="/machine-learning-playground" style={linkStyle}>
          ML Playground
        </NavLink>
      </nav>
    </header>
  );
}
