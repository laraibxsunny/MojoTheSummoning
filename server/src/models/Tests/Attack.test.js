const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Attack } = require("../Attack");
const { db } = require("../../db/config");

let attack;

beforeAll(async () => {
  await db.sync({ force: true });
  attack = await Attack.create({
    title: "Doo Doo Blast",
    mojoCost: 4,
    staminaCost: 4,
  });
});

afterAll(async () => await db.close());

describe("Attack Tests", () => {
  test("Attack has an id", async () => {
    expect(attack).toHaveProperty("id");
  });

  test("Attack has a title", async () => {
    expect(attack.title).toBe("Doo Doo Blast");
  });

  test("Attack has mojoCost", async () => {
    expect(attack.mojoCost).toBe(4);
  });

  test("Attack has staminaCost", async () => {
    expect(attack.staminaCost).toBe(4);
  });
});
