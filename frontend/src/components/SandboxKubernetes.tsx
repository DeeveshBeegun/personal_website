export default function SandboxKubernetes() {
  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Kubernetes Sandbox</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        A guided page to practice core Kubernetes ideas from deployment to
        scaling.
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
          <li>Create a namespace and set context.</li>
          <li>Deploy an app using a Deployment object.</li>
          <li>Expose it with a Service.</li>
          <li>Scale replicas and observe rolling updates.</li>
          <li>Inspect logs and pod states.</li>
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
            {`kubectl create namespace sandbox
kubectl config set-context --current --namespace=sandbox
kubectl apply -f deployment.yaml
kubectl get pods -w
kubectl expose deployment app --port=80 --target-port=8080
kubectl scale deployment app --replicas=4`}
          </pre>
        </div>
      </article>
    </section>
  );
}
