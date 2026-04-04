import { Link } from "react-router-dom";

const sandboxes = [
  {
    title: "Kubernetes Sandbox",
    route: "/sandbox-kubernetes",
    description:
      "Explore pods, deployments, services, and scaling workflows in a practical Kubernetes learning page.",
  },
  {
    title: "Kafka Sandbox",
    route: "/sandbox-kafka",
    description:
      "Understand topics, producers, consumers, and partitions with a focused Kafka experimentation page.",
  },
];

export default function SandboxPlayground() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Sandbox</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Hands-on playground pages for distributed systems topics. Pick a sandbox
        and start exploring.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {sandboxes.map((sandbox) => (
          <Link
            key={sandbox.route}
            to={sandbox.route}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #d8d8d8",
                borderRadius: "12px",
                padding: "18px",
                backgroundColor: "#fffdf8",
                cursor: "pointer",
                transition: "all 0.2s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                {sandbox.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#666",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {sandbox.description}
              </p>
              <div
                style={{
                  marginTop: "12px",
                  color: "#0070f3",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Open sandbox →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
