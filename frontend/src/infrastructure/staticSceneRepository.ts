import type { NightmareId } from "../domain/nightmare";
import type { NightmareScene } from "../domain/scene";
import type { SceneRepository } from "../application/playNightmare";

const SCENES: Record<NightmareId, NightmareScene> = {
  "nightmare-a": {
    nightmareId: "nightmare-a",
    durationSeconds: 60,
    keyframes: [],
  },
  "nightmare-b": {
    nightmareId: "nightmare-b",
    durationSeconds: 45,
    keyframes: [],
  },
};

export class StaticSceneRepository implements SceneRepository {
  async findByNightmareId(id: NightmareId): Promise<NightmareScene> {
    const scene = SCENES[id];
    if (!scene) throw new Error(`Scene not found: ${id}`);
    return scene;
  }
}
