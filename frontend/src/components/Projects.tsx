const projects = [
  {
    title: "Crypto AI Agent",
    description:
      "Intelligent agent for cryptocurrency analysis and trading insights. Integrates real-time market data with AI-driven decision making.",
    status: "In Development",
  },
  {
    title: "Kafka Visualization Tool",
    description:
      "Interactive dashboard for visualizing Kafka message streams, monitoring topics, and analyzing event flow in real-time.",
    status: "In Development",
  },
];

export default function Projects() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Current Projects</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Projects I'm actively working on. Each explores interesting problems in
        distributed systems and AI.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #d8d8d8",
              borderRadius: "12px",
              padding: "18px",
              backgroundColor: "#fffdf8",
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
              {project.title}
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
              {project.description}
            </p>
            <div
              style={{
                marginTop: "12px",
                color: "#0070f3",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {project.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
