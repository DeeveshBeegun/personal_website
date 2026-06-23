import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type WritingCounts = Record<string, number>;

const STORAGE_KEY = "writing-streak-counts";
const WORDS_STORAGE_KEY = "writing-streak-words";
const NOTION_SETTINGS_KEY = "writing-streak-notion-settings";
const NOTION_API_VERSION = "2022-06-28";

type NotionSettings = {
  token: string;
  databaseId: string;
  dateProperty: string;
  countProperty: string;
  wordsProperty: string;
  autoSync: boolean;
};

type ChartMetric = "sessions" | "words";

type SyncedNotionData = {
  counts: WritingCounts;
  words: WritingCounts;
};

const defaultNotionSettings: NotionSettings = {
  token: "",
  databaseId: "",
  dateProperty: "Date",
  countProperty: "Sessions",
  wordsProperty: "Words",
  autoSync: false,
};

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function dateToKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function keyToDate(key: string): Date | null {
  const [year, month, day] = key.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getDateRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  let current = startOfDay(start);
  const last = startOfDay(end);

  while (current <= last) {
    dates.push(current);
    current = addDays(current, 1);
  }

  return dates;
}

function loadCounts(): WritingCounts {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return {};
  }

  try {
    const parsed = JSON.parse(saved) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.entries(parsed).reduce<WritingCounts>((acc, [key, value]) => {
      if (typeof value === "number" && value > 0) {
        acc[key] = value;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

function loadWords(): WritingCounts {
  const saved = localStorage.getItem(WORDS_STORAGE_KEY);
  if (!saved) {
    return {};
  }

  try {
    const parsed = JSON.parse(saved) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.entries(parsed).reduce<WritingCounts>((acc, [key, value]) => {
      if (typeof value === "number" && value > 0) {
        acc[key] = Math.floor(value);
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

function loadNotionSettings(): NotionSettings {
  const saved = localStorage.getItem(NOTION_SETTINGS_KEY);
  if (!saved) {
    return defaultNotionSettings;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<NotionSettings>;
    return {
      token: parsed.token ?? "",
      databaseId: parsed.databaseId ?? "",
      dateProperty: parsed.dateProperty ?? "Date",
      countProperty: parsed.countProperty ?? "Sessions",
      wordsProperty: parsed.wordsProperty ?? "Words",
      autoSync: parsed.autoSync ?? false,
    };
  } catch {
    return defaultNotionSettings;
  }
}

function saveNotionSettings(settings: NotionSettings): void {
  localStorage.setItem(NOTION_SETTINGS_KEY, JSON.stringify(settings));
}

function trimDatabaseId(databaseId: string): string {
  return databaseId.replace(/-/g, "").trim();
}

function notionDateFromProperty(property: unknown): string | null {
  if (!property || typeof property !== "object") {
    return null;
  }

  const maybeDate = property as {
    type?: string;
    date?: { start?: string } | null;
  };
  if (maybeDate.type !== "date" || !maybeDate.date?.start) {
    return null;
  }

  return maybeDate.date.start;
}

function notionCountFromProperty(property: unknown): number {
  if (!property || typeof property !== "object") {
    return 1;
  }

  const maybeNumber = property as {
    type?: string;
    number?: number | null;
  };

  if (maybeNumber.type !== "number") {
    return 1;
  }

  return typeof maybeNumber.number === "number" && maybeNumber.number > 0
    ? maybeNumber.number
    : 1;
}

function notionWordsFromProperty(property: unknown): number {
  if (!property || typeof property !== "object") {
    return 0;
  }

  const maybeNumber = property as {
    type?: string;
    number?: number | null;
  };

  if (maybeNumber.type !== "number") {
    return 0;
  }

  return typeof maybeNumber.number === "number" && maybeNumber.number > 0
    ? Math.floor(maybeNumber.number)
    : 0;
}

async function fetchNotionCounts(
  settings: NotionSettings,
): Promise<SyncedNotionData> {
  const databaseId = trimDatabaseId(settings.databaseId);
  if (!settings.token || !databaseId) {
    throw new Error("Add a Notion integration token and database ID first.");
  }

  let hasMore = true;
  let nextCursor: string | undefined;
  const counts: WritingCounts = {};
  const words: WritingCounts = {};

  while (hasMore) {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${settings.token.trim()}`,
          "Notion-Version": NOTION_API_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_size: 100,
          start_cursor: nextCursor,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Notion sync failed (${response.status}): ${errorText || "Unknown error"}`,
      );
    }

    const payload = (await response.json()) as {
      results?: Array<{ properties?: Record<string, unknown> }>;
      has_more?: boolean;
      next_cursor?: string | null;
    };

    const results = payload.results ?? [];
    for (const result of results) {
      const properties = result.properties ?? {};
      const dateRaw = notionDateFromProperty(properties[settings.dateProperty]);
      if (!dateRaw) {
        continue;
      }

      const parsedDate = new Date(dateRaw);
      if (Number.isNaN(parsedDate.getTime())) {
        continue;
      }

      const key = dateToKey(startOfDay(parsedDate));
      const sessionCount = notionCountFromProperty(
        properties[settings.countProperty],
      );
      const wordCount = notionWordsFromProperty(
        properties[settings.wordsProperty],
      );
      counts[key] = (counts[key] ?? 0) + sessionCount;
      words[key] = (words[key] ?? 0) + wordCount;
    }

    hasMore = payload.has_more ?? false;
    nextCursor = payload.next_cursor ?? undefined;
  }

  return { counts, words };
}

function getSessionIntensity(count: number): string {
  if (count <= 0) return "#ebedf0";
  if (count === 1) return "#9be9a8";
  if (count === 2) return "#40c463";
  if (count === 3) return "#30a14e";
  return "#216e39";
}

function getWordIntensity(count: number): string {
  if (count <= 0) return "#ebedf0";
  if (count < 250) return "#c8e6ff";
  if (count < 600) return "#90cdf4";
  if (count < 1000) return "#4299e1";
  return "#1a4f9c";
}

function getCurrentStreak(counts: WritingCounts): number {
  let streak = 0;
  let cursor = startOfDay(new Date());

  while (counts[dateToKey(cursor)] > 0) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

function getLongestStreak(counts: WritingCounts): number {
  const activeDates = Object.keys(counts)
    .filter((key) => counts[key] > 0)
    .map((key) => keyToDate(key))
    .filter((date): date is Date => date !== null)
    .map((date) => startOfDay(date).getTime())
    .sort((a, b) => a - b);

  if (!activeDates.length) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let i = 1; i < activeDates.length; i += 1) {
    const diffDays =
      (activeDates[i] - activeDates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else if (diffDays > 1) {
      current = 1;
    }
  }

  return longest;
}

const templates = [
  {
    title: "Blog Post",
    route: "/writing-blog-post",
    description:
      "Personal insight or opinion piece. Quick to write and publish.",
  },
  {
    title: "Technical Article",
    route: "/writing-technical-article",
    description:
      "In-depth explanation of a concept or technology with examples.",
  },
  {
    title: "Essay",
    route: "/writing-essay",
    description:
      "Formal, structured argument with introduction, body, and conclusion.",
  },
  {
    title: "Tutorial",
    route: "/writing-tutorial",
    description:
      "Step-by-step guide to help readers learn a new skill or tool.",
  },
];

export default function Writing() {
  const [counts, setCounts] = useState<WritingCounts>(loadCounts);
  const [words, setWords] = useState<WritingCounts>(loadWords);
  const [notionSettings, setNotionSettings] =
    useState<NotionSettings>(loadNotionSettings);
  const [todayWordsInput, setTodayWordsInput] = useState("500");
  const [chartMetric, setChartMetric] = useState<ChartMetric>("sessions");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const today = useMemo(() => startOfDay(new Date()), []);
  const startDate = useMemo(() => addDays(today, -364), [today]);

  const heatmap = useMemo(() => {
    const days = getDateRange(startDate, today);
    const leadingBlanks = days[0].getDay();
    const cells: (Date | null)[] = [
      ...Array.from({ length: leadingBlanks }, () => null),
      ...days,
    ];

    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      weeks.push(cells.slice(i, i + 7));
    }

    return weeks;
  }, [startDate, today]);

  const monthRow = useMemo(() => {
    const labels: string[] = [];
    let lastMonth = -1;

    for (const week of heatmap) {
      const firstDate = week.find((day) => day !== null);
      if (!firstDate) {
        labels.push("");
        continue;
      }

      const month = firstDate.getMonth();
      if (month !== lastMonth) {
        labels.push(monthLabels[month]);
        lastMonth = month;
      } else {
        labels.push("");
      }
    }

    return labels;
  }, [heatmap]);

  const trackedDays = useMemo(
    () => Object.values(counts).filter((value) => value > 0).length,
    [counts],
  );

  const totalSessions = useMemo(
    () => Object.values(counts).reduce((sum, value) => sum + value, 0),
    [counts],
  );

  const totalWords = useMemo(
    () => Object.values(words).reduce((sum, value) => sum + value, 0),
    [words],
  );

  const averageWordsPerActiveDay = useMemo(() => {
    if (trackedDays === 0) {
      return 0;
    }

    return Math.round(totalWords / trackedDays);
  }, [trackedDays, totalWords]);

  const currentStreak = useMemo(() => getCurrentStreak(counts), [counts]);
  const longestStreak = useMemo(() => getLongestStreak(counts), [counts]);

  const markTodayAsWritten = () => {
    const key = dateToKey(today);
    const parsedWords = Number.parseInt(todayWordsInput, 10);
    const wordsForToday =
      Number.isFinite(parsedWords) && parsedWords > 0 ? parsedWords : 0;

    setCounts((prev) => {
      const next = {
        ...prev,
        [key]: (prev[key] ?? 0) + 1,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    setWords((prev) => {
      const next = {
        ...prev,
        [key]: (prev[key] ?? 0) + wordsForToday,
      };

      localStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const syncFromNotion = async () => {
    setIsSyncing(true);
    setSyncMessage("");

    try {
      const synced = await fetchNotionCounts(notionSettings);
      setCounts(synced.counts);
      setWords(synced.words);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(synced.counts));
      localStorage.setItem(WORDS_STORAGE_KEY, JSON.stringify(synced.words));
      setSyncMessage(
        `Synced ${Object.keys(synced.counts).length} active days from Notion.`,
      );
    } catch (error) {
      setSyncMessage(
        error instanceof Error ? error.message : "Notion sync failed.",
      );
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    saveNotionSettings(notionSettings);
  }, [notionSettings]);

  useEffect(() => {
    if (!notionSettings.autoSync) {
      return;
    }

    if (!notionSettings.token || !notionSettings.databaseId) {
      return;
    }

    void syncFromNotion();

    const interval = window.setInterval(() => {
      void syncFromNotion();
    }, 60000);

    return () => {
      window.clearInterval(interval);
    };
  }, [notionSettings]);

  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Writing Streak</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Track your daily writing habit. Mark each day you write and keep your
        streak alive.
      </p>

      <div
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
          marginBottom: "28px",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Notion Sync</h3>
        <p
          style={{
            marginTop: 0,
            color: "#555",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          Connect your Notion database to auto-update this chart. Each row needs
          a date property and optionally a number property for sessions.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "13px", color: "#444" }}>
              Integration Token
            </span>
            <input
              type="password"
              value={notionSettings.token}
              onChange={(e) =>
                setNotionSettings((prev) => ({
                  ...prev,
                  token: e.target.value,
                }))
              }
              placeholder="secret_..."
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "13px",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "13px", color: "#444" }}>Database ID</span>
            <input
              type="text"
              value={notionSettings.databaseId}
              onChange={(e) =>
                setNotionSettings((prev) => ({
                  ...prev,
                  databaseId: e.target.value,
                }))
              }
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "13px",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "13px", color: "#444" }}>
              Date Property Name
            </span>
            <input
              type="text"
              value={notionSettings.dateProperty}
              onChange={(e) =>
                setNotionSettings((prev) => ({
                  ...prev,
                  dateProperty: e.target.value,
                }))
              }
              placeholder="Date"
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "13px",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "13px", color: "#444" }}>
              Session Count Property
            </span>
            <input
              type="text"
              value={notionSettings.countProperty}
              onChange={(e) =>
                setNotionSettings((prev) => ({
                  ...prev,
                  countProperty: e.target.value,
                }))
              }
              placeholder="Sessions"
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "13px",
              }}
            />
          </label>

          <label
            style={{ display: "flex", flexDirection: "column", gap: "4px" }}
          >
            <span style={{ fontSize: "13px", color: "#444" }}>
              Word Count Property
            </span>
            <input
              type="text"
              value={notionSettings.wordsProperty}
              onChange={(e) =>
                setNotionSettings((prev) => ({
                  ...prev,
                  wordsProperty: e.target.value,
                }))
              }
              placeholder="Words"
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "8px",
                fontSize: "13px",
              }}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              void syncFromNotion();
            }}
            disabled={isSyncing}
            style={{
              backgroundColor: "#0969da",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              fontWeight: 600,
              cursor: isSyncing ? "not-allowed" : "pointer",
              opacity: isSyncing ? 0.7 : 1,
            }}
          >
            {isSyncing ? "Syncing..." : "Sync from Notion"}
          </button>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#444",
            }}
          >
            <input
              type="checkbox"
              checked={notionSettings.autoSync}
              onChange={(e) =>
                setNotionSettings((prev) => ({
                  ...prev,
                  autoSync: e.target.checked,
                }))
              }
            />
            Auto-sync every minute
          </label>

          {syncMessage ? (
            <span style={{ fontSize: "13px", color: "#444" }}>
              {syncMessage}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "14px",
          }}
        >
          <button
            type="button"
            onClick={markTodayAsWritten}
            style={{
              backgroundColor: "#2da44e",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Mark today as written
          </button>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#444",
            }}
          >
            Words today:
            <input
              type="number"
              min={0}
              value={todayWordsInput}
              onChange={(e) => setTodayWordsInput(e.target.value)}
              style={{
                width: "90px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "6px",
                fontSize: "13px",
              }}
            />
          </label>

          <div
            style={{
              display: "flex",
              gap: "14px",
              color: "#333",
              fontSize: "14px",
              flexWrap: "wrap",
            }}
          >
            <span>
              Current streak: <b>{currentStreak}</b>
            </span>
            <span>
              Longest streak: <b>{longestStreak}</b>
            </span>
            <span>
              Active days: <b>{trackedDays}</b>
            </span>
            <span>
              Writing sessions: <b>{totalSessions}</b>
            </span>
            <span>
              Words written: <b>{totalWords.toLocaleString()}</b>
            </span>
            <span>
              Avg words/day: <b>{averageWordsPerActiveDay.toLocaleString()}</b>
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
            color: "#444",
            fontSize: "13px",
          }}
        >
          Chart metric:
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="radio"
              name="chart-metric"
              checked={chartMetric === "sessions"}
              onChange={() => setChartMetric("sessions")}
            />
            Sessions
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <input
              type="radio"
              name="chart-metric"
              checked={chartMetric === "words"}
              onChange={() => setChartMetric("words")}
            />
            Words
          </label>
        </div>

        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: "780px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `36px repeat(${heatmap.length}, 12px)`,
                gap: "4px",
                alignItems: "center",
                marginBottom: "6px",
                color: "#666",
                fontSize: "11px",
              }}
            >
              <div />
              {monthRow.map((month, index) => (
                <div key={`month-${index}`}>{month}</div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `36px repeat(${heatmap.length}, 12px)`,
                gridTemplateRows: "repeat(7, 12px)",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {dayLabels.map((label, rowIndex) => (
                <div
                  key={`label-${label}`}
                  style={{
                    gridColumn: 1,
                    gridRow: rowIndex + 1,
                    fontSize: "11px",
                    color: "#666",
                  }}
                >
                  {rowIndex % 2 === 1 ? label : ""}
                </div>
              ))}

              {heatmap.map((week, colIndex) =>
                week.map((day, rowIndex) => {
                  const key = day
                    ? dateToKey(day)
                    : `blank-${colIndex}-${rowIndex}`;
                  const sessionsCount = day ? (counts[dateToKey(day)] ?? 0) : 0;
                  const wordsCount = day ? (words[dateToKey(day)] ?? 0) : 0;
                  const intensityValue =
                    chartMetric === "sessions" ? sessionsCount : wordsCount;

                  return (
                    <div
                      key={key}
                      title={
                        day
                          ? `${day.toDateString()} - ${sessionsCount} writing session${sessionsCount === 1 ? "" : "s"}, ${wordsCount.toLocaleString()} words`
                          : ""
                      }
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "2px",
                        backgroundColor: day
                          ? chartMetric === "sessions"
                            ? getSessionIntensity(intensityValue)
                            : getWordIntensity(intensityValue)
                          : "transparent",
                        border: day
                          ? "1px solid rgba(27, 31, 35, 0.06)"
                          : "none",
                        gridColumn: colIndex + 2,
                        gridRow: rowIndex + 1,
                      }}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: "8px" }}>Writing Templates</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Choose a template to get started writing. Each template includes
        structure tips, examples, and best practices.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {templates.map((template) => (
          <Link
            key={template.route}
            to={template.route}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #d8d8d8",
                borderRadius: "12px",
                padding: "18px",
                backgroundColor: "#fffdf8",
                cursor: "pointer",
                transition: "all 0.2s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
                {template.title}
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
                {template.description}
              </p>
              <div
                style={{
                  marginTop: "12px",
                  color: "#0070f3",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Start Writing →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
