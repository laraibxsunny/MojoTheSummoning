const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { Card } = require("../Card");
const { db } = require("../../db/config");

let card;

beforeAll(async () => {
  await db.sync({ force: true });
  card = await Card.create({
    name: "Doo Doo Domination",
    mojo: 69,
    stamina: 4,
    imgURL: "http://localhost:5000/img/arcturus-spellweaver.jpg",
  });
});

afterAll(async () => await db.close());

describe("Card Tests", () => {
  test("Card has an id", async () => {
    expect(card).toHaveProperty("id");
  });

  test("Card has a name", async () => {
    expect(card.name).toBe("Doo Doo Domination");
  });

  test("Card has mojo", async () => {
    expect(card.mojo).toBe(69);
  });

  test("Card has stamina", async () => {
    expect(card.stamina).toBe(4);
  });

  test("Card has imgURL", async () => {
    expect(card.imgURL).toBe(
      "http://localhost:5000/img/arcturus-spellweaver.jpg"
    );
  });
});
