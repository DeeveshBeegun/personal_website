import { useEffect, useState } from "react";

const GITHUB_USER = "DeeveshBeegun";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  created_at: string;
  fork: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "done">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=created&type=owner`,
        );
        if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
        const data: Repo[] = await res.json();
        if (cancelled) return;

        const sorted = data
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );

        setRepos(sorted);
        setStatus("done");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Projects</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        All my public projects on{" "}
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0070f3" }}
        >
          GitHub
        </a>
        , sorted by date (newest first).
      </p>

      {status === "loading" && (
        <p style={{ color: "#888" }}>Loading projects…</p>
      )}

      {status === "error" && (
        <p style={{ color: "#c0392b" }}>
          Couldn't load projects from GitHub right now. You can browse them
          directly{" "}
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3" }}
          >
            here
          </a>
          .
        </p>
      )}

      {status === "done" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #d8d8d8",
                borderRadius: "12px",
                padding: "18px",
                backgroundColor: "#fffdf8",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 2px 4px rgba(0, 0, 0, 0.05)";
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                {repo.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  color: "#666",
                  fontSize: "14px",
                  lineHeight: 1.5,
                  flex: 1,
                }}
              >
                {repo.description ?? "No description provided."}
              </p>
              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "13px",
                  color: "#777",
                }}
              >
                {repo.language && (
                  <span style={{ color: "#0070f3", fontWeight: 500 }}>
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span>★ {repo.stargazers_count}</span>
                )}
                <span style={{ marginLeft: "auto" }}>
                  {formatDate(repo.created_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
