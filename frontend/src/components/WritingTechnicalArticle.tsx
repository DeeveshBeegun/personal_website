export default function WritingTechnicalArticle() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Technical Article Template</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Deep dive into a technical topic. Explain concepts, provide code
        examples, and help readers understand complex ideas.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Technical Article Structure</h3>
        <ol style={{ lineHeight: 1.8 }}>
          <li>
            <b>Title &amp; Abstract (2-3 sentences):</b> What problem does this
            solve? Who is the audience?
          </li>
          <li>
            <b>Prerequisites:</b> List required knowledge or tools needed to
            follow along.
          </li>
          <li>
            <b>Problem Statement (1-2 paragraphs):</b> Why does this matter?
            What&apos;s the context?
          </li>
          <li>
            <b>Solution Overview (2-3 paragraphs):</b> High-level explanation
            before diving into code.
          </li>
          <li>
            <b>Step-by-Step Implementation (3-5 sections):</b> Break down code
            with explanations.
          </li>
          <li>
            <b>Code Examples:</b> Include runnable, well-commented examples.
          </li>
          <li>
            <b>Performance &amp; Considerations (1-2 paragraphs):</b> Tradeoffs,
            edge cases, optimization tips.
          </li>
          <li>
            <b>Conclusion &amp; Further Reading:</b> Summarize and link to
            related resources.
          </li>
        </ol>

        <h3>Quick Tips</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Use code blocks with syntax highlighting</li>
          <li>Include diagrams or flowcharts where helpful</li>
          <li>Explain the "why" not just the "what"</li>
          <li>Test all code examples before publishing</li>
          <li>Aim for 1500-3000 words for substantial articles</li>
          <li>Link to documentation and related articles</li>
        </ul>

        <h3>Example Section</h3>
        <div
          style={{
            backgroundColor: "#f3f4f6",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "12px",
            fontFamily: "monospace",
            fontSize: "13px",
            overflowX: "auto",
          }}
        >
          <pre style={{ margin: 0 }}>
            {`// Example: Understanding Time Complexity
function exampleFunction(arr) {
  // O(n) - linear time
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// O(n²) - quadratic time
function nested(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}`}
          </pre>
        </div>
      </article>
    </section>
  );
}
