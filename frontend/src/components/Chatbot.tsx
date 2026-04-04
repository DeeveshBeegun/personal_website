import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "Who are you?",
  "What technologies do you know?",
  "What are your interests?",
  "What projects have you built?",
  "How can I contact you?",
];

function getBotResponse(input: string): string {
  const q = input.toLowerCase().trim();

  if (
    q.match(/\b(who|about|yourself|introduce|tell me about you)\b/) ||
    q.match(/^(hi|hello|hey|sup|yo|greetings)[\s!?.]*$/)
  ) {
    return "Hey! I'm Deevesh — a Java developer with 4+ years of experience building and configuring Java applications. I'm also deeply into Finance, Psychology, and Computer Science. Feel free to ask me anything!";
  }

  if (q.match(/\b(java|spring|backend|develop|programming|language)\b/)) {
    return "Java is my primary language. I have 4+ years of professional experience developing, configuring, and deploying Java applications — from backend services to distributed systems.";
  }

  if (q.match(/\b(kubernetes|k8s|container|docker|orchestration|deploy)\b/)) {
    return "I'm adept at Kubernetes — deploying, scaling, and managing containerised applications in cluster environments. It's one of the core technologies I use in production systems.";
  }

  if (q.match(/\b(kafka|messaging|event|stream|broker|queue)\b/)) {
    return "I work extensively with Apache Kafka for building event-driven architectures and real-time data pipelines. It's a key tool in my distributed systems toolkit.";
  }

  if (q.match(/\b(tech|stack|skill|tool|framework|technologies|know|use)\b/)) {
    return "My core stack includes Java, Kubernetes, and Apache Kafka. I enjoy working across the full backend surface — from API design to distributed infrastructure.";
  }

  if (q.match(/\b(experience|year|work|career|job|professional)\b/)) {
    return "I have more than 4 years of professional experience as a Java developer, working on developing, configuring, and building Java applications — including distributed and cloud-native systems.";
  }

  if (
    q.match(
      /\b(interest|hobby|passion|like|enjoy|fan|finance|psychology|cs|computer science)\b/,
    )
  ) {
    return "Outside of code, I'm mainly interested in Finance, Psychology, and Computer Science. I find the intersections between these fields — like behavioural finance and AI — especially fascinating.";
  }

  if (q.match(/\b(project|build|portfolio|work|make|create|thing)\b/)) {
    return "You can check out my projects in the Projects section of this site! I've built things spanning machine learning visualisations, algorithm playgrounds, Kubernetes and Kafka sandboxes, and more.";
  }

  if (
    q.match(/\b(contact|email|reach|message|hire|get in touch|talk|connect)\b/)
  ) {
    return "The best way to reach me is through the contact details in my CV — you can download it from the About page. I'm always open to interesting conversations and opportunities!";
  }

  if (q.match(/\b(cv|resume|curriculum|download)\b/)) {
    return 'You can download my CV directly from the About page using the "Download CV" button. It has all my experience, skills, and contact info.';
  }

  if (
    q.match(
      /\b(machine learning|ml|ai|algorithm|model|regression|kmeans|decision tree)\b/,
    )
  ) {
    return "I have an interactive Machine Learning Playground on this site! It covers Linear Regression, Logistic Regression, K-Means Clustering, and Decision Trees — all visualised in the browser.";
  }

  if (q.match(/\b(sort|algorithm|data structure|algo)\b/)) {
    return "There's an Algorithms Playground on this site where you can visualise sorting algorithms in action. Great for learning or refreshing the fundamentals!";
  }

  if (q.match(/\b(sandbox|kubernetes sandbox|kafka sandbox)\b/)) {
    return "I built Kubernetes and Kafka sandbox environments on this site — interactive spaces to explore how those technologies work in a hands-on way.";
  }

  if (q.match(/\b(book|read|reading|recommend|literature)\b/)) {
    return "There's a Books section on the site where I share books that have influenced my thinking — spanning technology, finance, psychology, and more.";
  }

  if (q.match(/\b(writ|blog|essay|article|tutorial)\b/)) {
    return "I also have a Writing section on this site for essays, articles, and tutorials on topics I care about. It's still growing!";
  }

  if (q.match(/\b(location|where|country|mauritius|remote)\b/)) {
    return "I'm based in Mauritius 🌴 and I'm open to remote opportunities globally.";
  }

  if (
    q.match(/\b(thank|thanks|appreciate|helpful|cool|awesome|nice|great)\b/)
  ) {
    return "Happy to help! Feel free to ask anything else about me or my work 😊";
  }

  if (q.match(/\b(bye|goodbye|see you|later|take care)\b/)) {
    return "Take care! Feel free to come back anytime if you have more questions 👋";
  }

  return "That's a great question! I'm not sure I have a specific answer for that — but you can always download my CV from the About page or reach out directly for more details.";
}

let nextId = 1;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nextId++,
      role: "bot",
      text: "Hi! I'm Deevesh's AI assistant. Ask me anything about his background, skills, projects, or interests 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId++, role: "user", text: trimmed },
    ]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: nextId++, role: "bot", text: response },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#0070f3",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(0,112,243,0.4)",
          zIndex: 1000,
          transition: "background-color 0.2s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0051cc";
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#0070f3";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {isOpen ? (
          // X icon
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 4L16 16M16 4L4 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Chat bubble icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "88px",
            right: "24px",
            width: "340px",
            maxHeight: "520px",
            backgroundColor: "#fffdf8",
            border: "1px solid #d8d8d8",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
            overflow: "hidden",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              backgroundColor: "#0070f3",
              color: "white",
              fontWeight: 600,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              }}
            >
              D
            </div>
            <div>
              <div>Ask about Deevesh</div>
              <div style={{ fontSize: "11px", fontWeight: 400, opacity: 0.85 }}>
                Usually replies instantly
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "9px 12px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    backgroundColor:
                      msg.role === "user" ? "#0070f3" : "#f0f0ec",
                    color: msg.role === "user" ? "white" : "#111",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    backgroundColor: "#f0f0ec",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#999",
                        display: "inline-block",
                        animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: "0 12px 8px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: "5px 10px",
                    fontSize: "11px",
                    borderRadius: "999px",
                    border: "1px solid #0070f3",
                    backgroundColor: "transparent",
                    color: "#0070f3",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0070f3";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#0070f3";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid #e8e8e4",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              style={{
                flex: 1,
                padding: "8px 12px",
                borderRadius: "999px",
                border: "1px solid #d8d8d8",
                fontSize: "13px",
                outline: "none",
                backgroundColor: "#f9f9f7",
                fontFamily: "Arial, sans-serif",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#0070f3";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d8d8d8";
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                backgroundColor: input.trim() ? "#0070f3" : "#d8d8d8",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.2s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Bounce animation for typing indicator */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
