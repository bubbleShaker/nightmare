export interface SceneKeyframe {
  time: number;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}

export interface NightmareScene {
  nightmareId: string;
  durationSeconds: number;
  keyframes: SceneKeyframe[];
}
