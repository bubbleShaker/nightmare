import type { NightmareId } from "../domain/nightmare";
import type { NightmareScene } from "../domain/scene";

export interface SceneRepository {
  findByNightmareId(id: NightmareId): Promise<NightmareScene>;
}

export async function playNightmare(
  id: NightmareId,
  repo: SceneRepository
): Promise<NightmareScene> {
  return repo.findByNightmareId(id);
}
