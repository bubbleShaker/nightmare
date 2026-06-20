import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNightmares } from "../../application/getNightmares";
import { StaticNightmareRepository } from "../../infrastructure/staticNightmareRepository";
import type { Nightmare } from "../../domain/nightmare";

const repo = new StaticNightmareRepository();

export function SelectionPage() {
  const navigate = useNavigate();
  const [nightmares, setNightmares] = useState<Nightmare[]>([]);

  useEffect(() => {
    getNightmares(repo).then(setNightmares);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>悪夢シアター</h1>
      <p>再生する悪夢を選んでください。</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {nightmares.map((n) => (
          <li key={n.id} style={{ marginBottom: "1rem" }}>
            <button
              onClick={() => navigate(`/play/${n.id}`)}
              style={{ fontSize: "1.1rem", cursor: "pointer" }}
            >
              {n.title}
            </button>
            <p style={{ color: "#666", marginTop: "0.25rem" }}>{n.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
