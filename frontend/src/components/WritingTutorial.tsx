export default function WritingTutorial() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Tutorial Template</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Step-by-step guide to teach readers a skill or process. Clear,
        actionable instructions with examples.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Tutorial Structure</h3>
        <ol style={{ lineHeight: 1.8 }}>
          <li>
            <b>Introduction (1-2 paragraphs):</b>
            <ul>
              <li>What will readers learn?</li>
              <li>Why is this skill useful?</li>
              <li>How long will it take?</li>
            </ul>
          </li>
          <li>
            <b>Prerequisites &amp; Setup (1 section):</b>
            <ul>
              <li>Tools, software, or knowledge needed</li>
              <li>Installation or configuration steps</li>
              <li>Check: Can readers verify they&apos;re ready?</li>
            </ul>
          </li>
          <li>
            <b>Step 1-N (Multiple sections):</b>
            <ul>
              <li>Clear, numbered steps</li>
              <li>One main action per step</li>
              <li>Include screenshots or code snippets</li>
              <li>Explain the "why" for each step</li>
            </ul>
          </li>
          <li>
            <b>Verification (1 section):</b> How do readers know they succeeded?
          </li>
          <li>
            <b>Troubleshooting (Optional):</b> Common mistakes and solutions
          </li>
          <li>
            <b>Next Steps:</b> What to learn or do next
          </li>
        </ol>

        <h3>Writing Tips</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>
            Use imperative voice: "Click the button" (not "You should click")
          </li>
          <li>Be specific: "Save as tutorial.py" (not "Save the file")</li>
          <li>
            Number every step clearly—readers should never guess what&apos;s
            next
          </li>
          <li>
            Include expected results: "You should see 'Success' on screen"
          </li>
          <li>Provide code samples that readers can copy-paste</li>
          <li>Assume beginner knowledge of domain—explain jargon</li>
          <li>Check: Could someone completely new follow along?</li>
        </ul>

        <h3>Example Checklist</h3>
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "8px",
            padding: "12px",
            lineHeight: 1.8,
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>
            <b>Before publishing your tutorial:</b>
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>☐ Follow steps yourself start-to-finish (on a fresh system)</li>
            <li>☐ Each step is atomic (one action = one step)</li>
            <li>☐ Include expected output or screenshot after each step</li>
            <li>☐ Test all code snippets for syntax errors</li>
            <li>☐ Provide time estimate for completion</li>
            <li>☐ Explain any new terminology</li>
          </ul>
        </div>

        <h3>Ideal Length</h3>
        <p style={{ lineHeight: 1.6 }}>
          Tutorials are typically 1500-3000 words, depending on complexity.
          Shorter tutorials (500-800 words) work well for quick wins. Longer
          tutorials should have clear milestones or sections readers can
          bookmark.
        </p>
      </article>
    </section>
  );
}
