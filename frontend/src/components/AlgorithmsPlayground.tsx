import { Link } from "react-router-dom";

const topics = [
  {
    title: "Sorting Algorithms",
    route: "/sorting-algorithms",
    description:
      "Compare QuickSort, MergeSort, and other sorting techniques visually.",
  },
  {
    title: "Graph Traversal",
    route: "/graph-traversal",
    description:
      "BFS and DFS algorithms with step-by-step visualization. Coming soon.",
  },
  {
    title: "Dynamic Programming",
    route: "/dynamic-programming",
    description:
      "Solve optimal substructure problems with memoization. Coming soon.",
  },
  {
    title: "Greedy Algorithms",
    route: "/greedy-algorithms",
    description: "Explore local optimization strategies. Coming soon.",
  },
];

export default function AlgorithmsPlayground() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Algorithm Topics</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Interactive visualizations for fundamental algorithms. Select a topic to
        explore step-by-step execution.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {topics.map((topic) => (
          <Link
            key={topic.route}
            to={topic.route}
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
                {topic.title}
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
                {topic.description}
              </p>
              <div
                style={{
                  marginTop: "12px",
                  color: "#0070f3",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Explore →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
