const books = [
  {
    title: "Currently Reading",
    description:
      "Quiet: The Power of Introverts in a World That Can't Stop Talking",
    status: "In Progress",
  },
  {
    title: "Recently Finished",
    description: "12 Rules for Life: An Antidote to Chaos",
    status: "Completed",
  },
];

export default function Book() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Reading</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        A collection of books I'm reading or have recently completed. These
        works shape my thinking and inspire my work.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {books.map((book, idx) => (
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
              {book.title}
            </h3>
            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: "14px",
                lineHeight: 1.5,
                flex: 1,
                fontStyle: "italic",
              }}
            >
              {book.description}
            </p>
            <div
              style={{
                marginTop: "12px",
                color: "#0070f3",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              {book.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
