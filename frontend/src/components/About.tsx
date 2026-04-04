import { useEffect, useRef, useState } from "react";

function About() {
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

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      style={{
        maxWidth: "920px",
        margin: "0 auto",
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <p
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "24px",
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          textAlign: "center",
          lineHeight: 1.6,
          backgroundColor: "#fffdf8",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <span
          onMouseEnter={showStatus}
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: "4px",
          }}
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
                backgroundColor: "rgba(17, 17, 17, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                color: "#fff",
                fontSize: "12px",
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
        , I am Deevesh, a Java developer with more than 4 years of experience in
        developing, configuring, and building Java applications. I am adept in
        technologies like Kubernetes and Kafka. I am mainly interested in
        Finance, Psychology and Computer Science.
      </p>
      <div style={{ textAlign: "center", marginTop: "24px" }}>
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
            const el = e.currentTarget;
            el.style.backgroundColor = "#0051cc";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#0070f3";
          }}
        >
          Download CV
        </button>
      </div>
    </section>
  );
}

export default About;
