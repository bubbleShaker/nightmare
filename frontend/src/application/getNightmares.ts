import type { Nightmare } from "../domain/nightmare";

export interface NightmareRepository {
  findAll(): Promise<Nightmare[]>;
}

export async function getNightmares(repo: NightmareRepository): Promise<Nightmare[]> {
  return repo.findAll();
}
