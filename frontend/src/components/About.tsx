import { useEffect, useRef, useState } from "react";

function About() {
  const currentStatus = "Dreamin'";
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const hideStatusTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setIsStatusVisible(true);
    hideStatusTimeoutRef.current = window.setTimeout(() => {
      setIsStatusVisible(false);
      hideStatusTimeoutRef.current = null;
    }, 1600);

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
    <section>
      <h2>About Me</h2>
      <p>
        <span
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
                backgroundColor: "#111",
                color: "#fff",
                fontSize: "12px",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {currentStatus}
            </span>
          )}
          Hi 👋
        </span>
        , I am Deevesh Beegun, a Java developer with more than 4 years of
        experience in developing, configuring, and building Java applications. I
        am adept in technologies like Kubernetes and Kafka. I am mainly
        interested in Finance, Psychology and Computer Science.
      </p>
      <button
        onClick={handleDownloadCV}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Download CV
      </button>

      <h2>Current Project</h2>
      <p>
        I am currently working on a cypto-ai-agent and a kafka tool for
        visualisation.
      </p>

      <h2>Current Book</h2>
      <p>
        I am currently reading Quiet: The Power of Introverts in a World That
        Can't Stop Talking
      </p>

      <h2>Writing</h2>
      <p></p>
    </section>
  );
}

export default About;
