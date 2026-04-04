import { useState } from "react";

export default function WritingBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Blog Post Template</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Write a personal or opiniated piece on a topic you&apos;re passionate
        about. Great for sharing thoughts, lessons learned, or reflections.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Blog Post Structure</h3>
        <ol style={{ lineHeight: 1.8 }}>
          <li>
            <b>Hook (1-2 sentences):</b> Grab reader attention with a question,
            bold statement, or relatable experience.
          </li>
          <li>
            <b>Context (2-3 paragraphs):</b> Set the scene. Why are you writing
            this? What problem or topic is relevant now?
          </li>
          <li>
            <b>Main Idea (3-5 paragraphs):</b> Expand your thesis. Use examples,
            stories, and evidence.
          </li>
          <li>
            <b>Reflection (1-2 paragraphs):</b> What did you learn? What are
            implications for readers?
          </li>
          <li>
            <b>Call to Action (1 sentence):</b> Ask readers to comment, share,
            or reflect themselves.
          </li>
        </ol>

        <h3>Quick Tips</h3>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Keep your voice personal and authentic</li>
          <li>Edit for clarity but keep conversational tone</li>
          <li>Use short paragraphs (2-4 sentences) for readability</li>
          <li>Include one compelling example or story</li>
          <li>Target 600-1200 words for typical blog posts</li>
        </ul>

        <h3>Try It Now</h3>
        <div style={{ marginBottom: "12px" }}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Thoughts on..."
              style={{
                width: "100%",
                marginTop: "4px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your blog post..."
              style={{
                width: "100%",
                minHeight: "300px",
                marginTop: "4px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            />
          </label>
        </div>

        {title || content ? (
          <div
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <h4>Preview:</h4>
            {title && <h4 style={{ margin: "8px 0" }}>{title}</h4>}
            {content && (
              <p style={{ margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                {content}
              </p>
            )}
          </div>
        ) : null}
      </article>
    </section>
  );
}
