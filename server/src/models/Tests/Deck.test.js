const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Deck } = require("../Deck");
const { db } = require("../../db/config");

let deck;

beforeAll(async () => {
  await db.sync({ force: true });
  deck = await Deck.create({ name: "Doo Doo Deck", xp: 69 });
});

afterAll(async () => await db.close());

describe("Deck Tests", () => {
  test("Deck has an id", async () => {
    expect(deck).toHaveProperty("id");
  });

  test("Deck has a name", async () => {
    expect(deck.name).toBe("Doo Doo Deck");
  });

  test("Deck has xp", async () => {
    expect(deck.xp).toBe(69);
  });
});
