type SyncStatus = "Synced" | "OutOfSync";
type Health = "Healthy" | "Progressing" | "Degraded";

interface Application {
  name: string;
  syncStatus: SyncStatus;
  health: Health;
  stack: string;
  environment: string;
  description: string;
}

const APPLICATIONS: Application[] = [
  {
    name: "java-17-certification",
    syncStatus: "Synced",
    health: "Healthy",
    stack: "Java 17",
    environment: "learning",
    description: "Preparing for the Java 17 certification.",
  },
  {
    name: "spring-boot-api",
    syncStatus: "Synced",
    health: "Healthy",
    stack: "Spring Boot",
    environment: "development",
    description: "Building clean backend services and REST APIs.",
  },
  {
    name: "kafka-microservices",
    syncStatus: "Synced",
    health: "Healthy",
    stack: "Kafka",
    environment: "development",
    description:
      "Working with event-driven systems, message routing, and streaming.",
  },
  {
    name: "kubernetes-lab",
    syncStatus: "Synced",
    health: "Progressing",
    stack: "Kubernetes",
    environment: "staging",
    description: "Practicing deployments, services, ingress, pods, and scaling.",
  },
  {
    name: "ai-dev-tools",
    syncStatus: "OutOfSync",
    health: "Progressing",
    stack: "LLMs / AI",
    environment: "experimental",
    description: "Experimenting with AI tools for developers.",
  },
  {
    name: "gumroad-products",
    syncStatus: "OutOfSync",
    health: "Degraded",
    stack: "Digital Products",
    environment: "production",
    description: "Shipping small products and learning marketing.",
  },
  {
    name: "portfolio-site",
    syncStatus: "Synced",
    health: "Healthy",
    stack: "React / Frontend",
    environment: "production",
    description: "Improving my personal brand and online presence.",
  },
];

const SYNC_COLORS: Record<SyncStatus, { fg: string; bg: string }> = {
  Synced: { fg: "#16a34a", bg: "rgba(22, 163, 74, 0.12)" },
  OutOfSync: { fg: "#7c3aed", bg: "rgba(124, 58, 237, 0.12)" },
};

const HEALTH_COLORS: Record<Health, { fg: string; bg: string }> = {
  Healthy: { fg: "#16a34a", bg: "rgba(22, 163, 74, 0.12)" },
  Progressing: { fg: "#2563eb", bg: "rgba(37, 99, 235, 0.12)" },
  Degraded: { fg: "#ea580c", bg: "rgba(234, 88, 12, 0.12)" },
};

const LEGEND = [
  { term: "Synced", desc: "aligned with my current goals", color: "#16a34a" },
  { term: "OutOfSync", desc: "needs more attention", color: "#7c3aed" },
  { term: "Healthy", desc: "going well", color: "#16a34a" },
  { term: "Progressing", desc: "actively improving", color: "#2563eb" },
  { term: "Degraded", desc: "needs debugging", color: "#ea580c" },
];

function Badge({
  label,
  fg,
  bg,
}: {
  label: string;
  fg: string;
  bg: string;
}) {
  return (
    <span className="dcp-badge" style={{ color: fg, backgroundColor: bg }}>
      <span className="dcp-badge-dot" style={{ backgroundColor: fg }} />
      {label}
    </span>
  );
}

export default function ControlPlane() {
  const summary = {
    total: APPLICATIONS.length,
    synced: APPLICATIONS.filter((a) => a.syncStatus === "Synced").length,
    healthy: APPLICATIONS.filter((a) => a.health === "Healthy").length,
  };

  return (
    <section className="dcp" aria-label="Developer Control Plane">
      <div className="dcp-header">
        <div>
          <h2 className="dcp-title">
            <span className="dcp-logo" aria-hidden="true" />
            Developer Control Plane
          </h2>
          <p className="dcp-subtitle">
            Current deployments across my learning, building, and product
            journey.
          </p>
        </div>
        <div className="dcp-stats">
          <span className="dcp-stat">
            <strong>{summary.total}</strong> apps
          </span>
          <span className="dcp-stat">
            <strong>{summary.synced}</strong> synced
          </span>
          <span className="dcp-stat">
            <strong>{summary.healthy}</strong> healthy
          </span>
        </div>
      </div>

      <div className="dcp-grid">
        {APPLICATIONS.map((app) => (
          <article key={app.name} className="dcp-card">
            <div className="dcp-card-top">
              <span className="dcp-kind" aria-hidden="true">
                app
              </span>
              <h3 className="dcp-name">{app.name}</h3>
            </div>

            <div className="dcp-badges">
              <Badge
                label={app.syncStatus}
                fg={SYNC_COLORS[app.syncStatus].fg}
                bg={SYNC_COLORS[app.syncStatus].bg}
              />
              <Badge
                label={app.health}
                fg={HEALTH_COLORS[app.health].fg}
                bg={HEALTH_COLORS[app.health].bg}
              />
            </div>

            <p className="dcp-desc">{app.description}</p>

            <div className="dcp-labels">
              <span className="dcp-label">
                <span className="dcp-label-key">stack</span>
                {app.stack}
              </span>
              <span className="dcp-label">
                <span className="dcp-label-key">env</span>
                {app.environment}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="dcp-legend">
        <span className="dcp-legend-title">Legend</span>
        <div className="dcp-legend-items">
          {LEGEND.map((item) => (
            <span key={item.term} className="dcp-legend-item">
              <span
                className="dcp-legend-dot"
                style={{ backgroundColor: item.color }}
              />
              <strong>{item.term}</strong> = {item.desc}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .dcp {
          font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Consolas, monospace;
          color: #1a1a1a;
        }
        .dcp-header {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
          margin-bottom: 20px;
        }
        .dcp-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 4px;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .dcp-logo {
          width: 14px;
          height: 14px;
          border-radius: 4px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
        }
        .dcp-subtitle {
          margin: 0;
          font-size: 13px;
          color: #6b7280;
          font-family: inherit;
        }
        .dcp-stats {
          display: flex;
          gap: 14px;
          font-size: 12px;
          color: #6b7280;
        }
        .dcp-stat strong { color: #111827; }

        .dcp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }

        .dcp-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-left: 3px solid #d1d5db;
          border-radius: 10px;
          background-color: #ffffff;
          transition: transform 0.18s ease, box-shadow 0.18s ease,
            border-left-color 0.18s ease;
        }
        .dcp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          border-left-color: #2563eb;
        }

        .dcp-card-top { display: flex; flex-direction: column; gap: 4px; }
        .dcp-kind {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
        }
        .dcp-name {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          word-break: break-word;
        }

        .dcp-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .dcp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 9px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
        }
        .dcp-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .dcp-desc {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #4b5563;
          font-family: system-ui, -apple-system, sans-serif;
          flex: 1;
        }

        .dcp-labels { display: flex; flex-wrap: wrap; gap: 6px; }
        .dcp-label {
          display: inline-flex;
          align-items: center;
          font-size: 11px;
          color: #374151;
          background-color: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }
        .dcp-label-key {
          padding: 2px 6px;
          margin-right: 6px;
          background-color: #e5e7eb;
          color: #6b7280;
          font-weight: 600;
        }
        .dcp-label { padding-right: 8px; }

        .dcp-legend {
          margin-top: 20px;
          padding: 14px 16px;
          border: 1px dashed #d1d5db;
          border-radius: 10px;
          background-color: #fafafa;
        }
        .dcp-legend-title {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 8px;
        }
        .dcp-legend-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 18px;
        }
        .dcp-legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #4b5563;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .dcp-legend-item strong {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          color: #111827;
        }
        .dcp-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

        @media (max-width: 600px) {
          .dcp-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
