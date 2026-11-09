import { describe, expect, it } from "vitest";
import { companionIdle } from "./companion-idle";

describe("companion idle", () => {
  it("stops every motion when reduced motion is requested", () => {
    for (const time of [0, 1, 30, 100]) {
      expect(companionIdle(time, true)).toEqual({ body: 0, head: 0, hand: 0, fire: 1 });
    }
  });
  it("keeps idle movement restrained and firelight positive", () => {
    for (let time = 0; time < 100; time += 0.1) {
      const pose = companionIdle(time, false);
      expect(Math.abs(pose.body)).toBeLessThanOrEqual(0.018);
      expect(Math.abs(pose.head)).toBeLessThanOrEqual(0.07);
      expect(Math.abs(pose.hand)).toBeLessThanOrEqual(0.025);
      expect(pose.fire).toBeGreaterThanOrEqual(0.88);
    }
    expect(companionIdle(1, false).body).not.toBe(companionIdle(0, false).body);
  });
});