export default function SandboxKafka() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Kafka Sandbox</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        A practical page to explore Kafka topics, producers, consumers, and
        partition behavior.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Practice Flow</h3>
        <ol style={{ lineHeight: 1.8 }}>
          <li>Create a topic with multiple partitions.</li>
          <li>Publish events with a producer.</li>
          <li>Read events with one consumer group.</li>
          <li>Add more consumers and observe rebalance.</li>
          <li>Inspect offsets and lag.</li>
        </ol>

        <h3>Useful Commands</h3>
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
            {`kafka-topics --create --topic orders --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
kafka-console-producer --topic orders --bootstrap-server localhost:9092
kafka-console-consumer --topic orders --group analytics --from-beginning --bootstrap-server localhost:9092
kafka-consumer-groups --describe --group analytics --bootstrap-server localhost:9092`}
          </pre>
        </div>
      </article>
    </section>
  );
}
