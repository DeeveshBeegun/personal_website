import { useEffect, useRef, useState } from "react";

const MONO =
  "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace";

const SKILLS = [
  "Java",
  "Spring",
  "Kubernetes",
  "Apache Kafka",
  "Distributed Systems",
  "Backend",
];

const INTERESTS = ["Finance", "Psychology", "Computer Science"];

const CONSOLE_LINES = [
  "$ javac Deevesh.java",
  "$ java Deevesh",
  "> Compiling experience... 4+ years OK",
  "> learn(Finance, Psychology, CS) ✓",
  "> build().deploy(Kubernetes.cluster()) ✓",
  "> Kafka.publish(ideas) → 9001 events/sec ✓",
  "> Process finished with exit code 0 ☕",
];

const CONTACT_EMAIL = "deeveshbeegun@gmail.com";

function WindowDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "999px",
        border: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        fontSize: "13px",
        color: "#333",
        fontFamily: MONO,
      }}
    >
      {label}
    </span>
  );
}

function About() {
  // "Currently…" status pill, revealed on hover over the greeting.
  const currentStatus = "Dreamin' 😴";
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const hideStatusTimeoutRef = useRef<number | null>(null);

  const showStatus = () => {
    if (hideStatusTimeoutRef.current !== null) {
      window.clearTimeout(hideStatusTimeoutRef.current);
    }

    setIsStatusVisible(true);
    hideStatusTimeoutRef.current = window.setTimeout(() => {
      setIsStatusVisible(false);
      hideStatusTimeoutRef.current = null;
    }, 1600);
  };

  useEffect(() => {
    showStatus();
    return () => {
      if (hideStatusTimeoutRef.current !== null) {
        window.clearTimeout(hideStatusTimeoutRef.current);
      }
    };
  }, []);

  // "Run" the Deevesh.java snippet — streams console output line by line.
  const [isRunning, setIsRunning] = useState(false);
  const [printedLines, setPrintedLines] = useState<string[]>([]);
  const runTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      runTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleRun = () => {
    if (isRunning) return;

    runTimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    runTimeoutsRef.current = [];

    setIsRunning(true);
    setPrintedLines([]);

    CONSOLE_LINES.forEach((line, index) => {
      const id = window.setTimeout(
        () => {
          setPrintedLines((prev) => [...prev, line]);
          if (index === CONSOLE_LINES.length - 1) {
            setIsRunning(false);
          }
        },
        450 * (index + 1),
      );
      runTimeoutsRef.current.push(id);
    });
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Contact form — opens the visitor's mail client. The email is optional, so
  // a sender can stay anonymous if they leave it blank.
  const [contactMessage, setContactMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const handleSendMessage = () => {
    const trimmedMessage = contactMessage.trim();
    const trimmedEmail = senderEmail.trim();
    if (!trimmedMessage || !trimmedEmail) return;

    const subject = encodeURIComponent("Message from your website");
    const body = encodeURIComponent(
      `${trimmedMessage}\n\n— Reply to: ${trimmedEmail}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const canSend =
    contactMessage.trim().length > 0 && senderEmail.trim().length > 0;

  return (
    <section
      style={{
        maxWidth: "760px",
        width: "100%",
        margin: "0 auto",
        padding: "64px 20px 96px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      {/* Header */}
      <header>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "32px",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            onMouseEnter={showStatus}
            style={{ position: "relative", display: "inline-block" }}
          >
            {isStatusVisible && (
              <span
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(17, 17, 17, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <span>Currently</span>
                <span>{currentStatus}</span>
              </span>
            )}
            Hi 👋
          </span>
          <span>I'm Deevesh</span>
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "15px",
            color: "#666",
            fontFamily: MONO,
          }}
        >
          Java Developer · 4+ years of experience
        </p>
      </header>

      {/* Bio */}
      <div style={{ fontSize: "16px", lineHeight: 1.7, color: "#222" }}>
        <p style={{ margin: "0 0 16px" }}>
          I'm a Java developer with more than four years of experience
          developing, configuring, and building Java applications — from backend
          services to cloud-native, distributed systems. I enjoy working across
          the full backend surface, designing reliable services and the
          infrastructure that keeps them running.
        </p>
        <p style={{ margin: 0 }}>
          Day to day I lean on technologies like Kubernetes and Apache Kafka to
          build and operate event-driven systems at scale. Outside of code, I'm
          drawn to Finance, Psychology, and Computer Science — and especially
          the places where they overlap.
        </p>
      </div>

      {/* Tech & interests */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h2 style={{ margin: "0 0 10px", fontSize: "13px", color: "#888" }}>
            TECH I WORK WITH
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SKILLS.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ margin: "0 0 10px", fontSize: "13px", color: "#888" }}>
            INTERESTED IN
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {INTERESTS.map((interest) => (
              <Chip key={interest} label={interest} />
            ))}
          </div>
        </div>
      </div>

      {/* Deevesh.java — a little personality */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #2d2d2d",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            backgroundColor: "#2d2d2d",
          }}
        >
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <WindowDot color="#ff5f56" />
            <WindowDot color="#ffbd2e" />
            <WindowDot color="#27c93f" />
            <span
              style={{
                marginLeft: "8px",
                color: "#9d9d9d",
                fontFamily: MONO,
                fontSize: "12px",
              }}
            >
              Deevesh.java
            </span>
          </div>
          <button
            onClick={handleRun}
            disabled={isRunning}
            style={{
              padding: "5px 12px",
              cursor: isRunning ? "default" : "pointer",
              backgroundColor: isRunning ? "#3a3a3a" : "#27c93f",
              color: isRunning ? "#9d9d9d" : "#0d2a12",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "12px",
              fontFamily: MONO,
              transition: "all 0.2s ease",
            }}
          >
            {isRunning ? "Running…" : "▶ Run"}
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "20px 24px",
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            fontFamily: MONO,
            fontSize: "13px",
            lineHeight: 1.6,
            textAlign: "left",
            overflowX: "auto",
          }}
        >
          <code>
            <span style={{ color: "#569cd6" }}>public class</span>{" "}
            <span style={{ color: "#4ec9b0" }}>Deevesh</span>{" "}
            <span style={{ color: "#569cd6" }}>extends</span>{" "}
            <span style={{ color: "#4ec9b0" }}>Human</span>{" "}
            <span style={{ color: "#569cd6" }}>implements</span>{" "}
            <span style={{ color: "#4ec9b0" }}>Runnable</span> {"{"}
            {"\n\n"}
            {"    "}
            <span style={{ color: "#569cd6" }}>@Override</span>
            {"\n"}
            {"    "}
            <span style={{ color: "#569cd6" }}>public</span>{" "}
            <span style={{ color: "#569cd6" }}>void</span>{" "}
            <span style={{ color: "#dcdcaa" }}>run</span>() {"{"}
            {"\n"}
            {"        "}
            <span style={{ color: "#6a9955" }}>
              // 4+ years shipping Java, one cup of coffee at a time
            </span>
            {"\n"}
            {"        "}
            <span style={{ color: "#569cd6" }}>while</span> (alive) {"{"}
            {"\n"}
            {"            "}
            <span style={{ color: "#dcdcaa" }}>learn</span>(
            <span style={{ color: "#ce9178" }}>"Finance"</span>,{" "}
            <span style={{ color: "#ce9178" }}>"Psychology"</span>,{" "}
            <span style={{ color: "#ce9178" }}>"CS"</span>);
            {"\n"}
            {"            "}
            <span style={{ color: "#dcdcaa" }}>build</span>().
            <span style={{ color: "#dcdcaa" }}>deploy</span>(
            <span style={{ color: "#4ec9b0" }}>Kubernetes</span>.
            <span style={{ color: "#dcdcaa" }}>cluster</span>());
            {"\n"}
            {"            "}
            <span style={{ color: "#4ec9b0" }}>Kafka</span>.
            <span style={{ color: "#dcdcaa" }}>publish</span>(ideas);
            {"\n"}
            {"        "}
            {"}"}
            {"\n"}
            {"    "}
            {"}"}
            {"\n"}
            {"}"}
          </code>
        </pre>
        {(isRunning || printedLines.length > 0) && (
          <div
            style={{
              borderTop: "1px solid #2d2d2d",
              padding: "14px 24px",
              backgroundColor: "#141414",
              color: "#c8c8c8",
              fontFamily: MONO,
              fontSize: "12.5px",
              lineHeight: 1.7,
              textAlign: "left",
            }}
          >
            {printedLines.map((line, index) => (
              <div
                key={index}
                style={{
                  color: line.startsWith("$")
                    ? "#9d9d9d"
                    : line.includes("exit code 0")
                      ? "#27c93f"
                      : "#c8c8c8",
                }}
              >
                {line}
              </div>
            ))}
            {isRunning && (
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "15px",
                  backgroundColor: "#27c93f",
                  animation: "blink 1s step-start infinite",
                  verticalAlign: "middle",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Download CV */}
      <div>
        <button
          onClick={handleDownloadCV}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0051cc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0070f3";
          }}
        >
          Download CV
        </button>
      </div>

      {/* Contact */}
      <div
        style={{
          padding: "24px",
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          backgroundColor: "#fffdf8",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 600 }}>
          Send me a message 📨
        </h2>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: "13px",
            color: "#666",
            lineHeight: 1.5,
          }}
        >
          Drop your email and a message.
        </p>
        <input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          placeholder="Your email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #d8d8d8",
            fontFamily: "inherit",
            fontSize: "14px",
            boxSizing: "border-box",
            backgroundColor: "#fff",
          }}
        />
        <textarea
          value={contactMessage}
          onChange={(e) => setContactMessage(e.target.value)}
          placeholder="Type your message here…"
          rows={5}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #d8d8d8",
            fontFamily: "inherit",
            fontSize: "14px",
            lineHeight: 1.5,
            resize: "vertical",
            boxSizing: "border-box",
            backgroundColor: "#fff",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <button
            onClick={handleSendMessage}
            disabled={!canSend}
            style={{
              padding: "10px 20px",
              cursor: canSend ? "pointer" : "not-allowed",
              backgroundColor: canSend ? "#0070f3" : "#b9d4f7",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: 500,
              fontSize: "14px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!canSend) return;
              e.currentTarget.style.backgroundColor = "#0051cc";
            }}
            onMouseLeave={(e) => {
              if (!canSend) return;
              e.currentTarget.style.backgroundColor = "#0070f3";
            }}
          >
            Send message
          </button>
        </div>
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </section>
  );
}

export default About;
