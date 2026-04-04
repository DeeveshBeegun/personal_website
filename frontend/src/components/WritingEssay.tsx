export default function WritingEssay() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Essay Template</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Formal, structured argument. Present a thesis, support it with evidence,
        and conclude with meaningful insights.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Essay Structure (Five-Paragraph)</h3>
        <ol style={{ lineHeight: 1.8 }}>
          <li>
            <b>Introduction (1 paragraph):</b>
            <ul>
              <li>Open with context or a hook</li>
              <li>Define the topic clearly</li>
              <li>State your thesis (main argument) clearly</li>
            </ul>
          </li>
          <li>
            <b>Body Paragraph 1 (1 paragraph):</b>
            <ul>
              <li>Topic sentence introducing first supporting idea</li>
              <li>Evidence: examples, quotes, or data</li>
              <li>Analysis: explain why this evidence supports your thesis</li>
            </ul>
          </li>
          <li>
            <b>Body Paragraph 2 (1 paragraph):</b> Same structure with second
            supporting idea
          </li>
          <li>
            <b>Body Paragraph 3 (1 paragraph):</b> Same structure with third
            supporting idea
          </li>
          <li>
            <b>Conclusion (1 paragraph):</b>
            <ul>
              <li>Restate thesis in fresh language</li>
              <li>Summarize key points</li>
              <li>End with broader implications or call to action</li>
            </ul>
          </li>
        </ol>

        <h3>Key Principles</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            <b>Thesis-Driven:</b> Every paragraph should support your central
            argument
          </li>
          <li>
            <b>Evidence-Based:</b> Use specific examples, not vague statements
          </li>
          <li>
            <b>Logical Flow:</b> Each paragraph connects to the next
          </li>
          <li>
            <b>Active Voice:</b> Be direct and clear in your language
          </li>
          <li>
            <b>Avoid Clichés:</b> Use original phrasing and examples
          </li>
        </ul>

        <h3>Thesis Statement Examples</h3>
        <div
          style={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "12px",
            lineHeight: 1.6,
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>
            <b>Weak:</b> "Remote work is good for companies."
          </p>
          <p style={{ margin: 0 }}>
            <b>Strong:</b> "Remote work increases employee productivity and
            reduces operational costs, but requires strong communication systems
            to maintain team cohesion."
          </p>
        </div>

        <h3>TIP</h3>
        <p style={{ lineHeight: 1.6 }}>
          Aim for 1000-2000 words. Each body paragraph should be 150-250 words.
          Save time for revision—essays improve significantly with editing.
        </p>
      </article>
    </section>
  );
}
