import type { Nightmare } from "../domain/nightmare";
import type { NightmareRepository } from "../application/getNightmares";

const NIGHTMARES: Nightmare[] = [
  {
    id: "nightmare-a",
    title: "化け猫の悪夢",
    description:
      "元飼い猫が巨大化した化け物が家に侵入しようとする。その背に乗り、はるか上空へ急上昇——そして急転直下、異国の海へ叩きつけられた。",
  },
  {
    id: "nightmare-b",
    title: "浮遊・落下の悪夢",
    description:
      "制御できないまま体がどんどん上昇する。建物が小さくなり、風に流されて異国の地へ。最後は一気に落下し、地面に叩きつけられる瞬間に目が覚める。",
  },
];

export class StaticNightmareRepository implements NightmareRepository {
  async findAll(): Promise<Nightmare[]> {
    return NIGHTMARES;
  }
}
