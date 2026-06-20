export type NightmareId = "nightmare-a" | "nightmare-b";

export interface Nightmare {
  id: NightmareId;
  title: string;
  description: string;
}
