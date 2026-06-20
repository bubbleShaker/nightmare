import { getNightmares } from "../application/getNightmares";
import type { Nightmare } from "../domain/nightmare";
import type { NightmareRepository } from "../application/getNightmares";

class StubRepository implements NightmareRepository {
  async findAll(): Promise<Nightmare[]> {
    return [
      { id: "nightmare-a", title: "テストA", description: "説明A" },
      { id: "nightmare-b", title: "テストB", description: "説明B" },
    ];
  }
}

describe("getNightmares", () => {
  it("リポジトリから悪夢一覧を返す", async () => {
    const result = await getNightmares(new StubRepository());
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("nightmare-a");
  });
});
