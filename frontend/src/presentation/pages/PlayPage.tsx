import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { NightmareId } from "../../domain/nightmare";

export function PlayPage() {
  const { id } = useParams<{ id: NightmareId }>();
  const navigate = useNavigate();

  useEffect(() => {
    // 3D シーン実装は Issue #4, #5 で行う
    // ここではプレースホルダーとして一定時間後に選択画面へ戻る
    const timer = setTimeout(() => navigate("/"), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#000",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <p>悪夢を再生中: {id}</p>
      <p style={{ color: "#888", fontSize: "0.9rem" }}>
        3D シーンは実装予定です（3秒後に戻ります）
      </p>
    </div>
  );
}
