const { User, Attack, Deck, Card } = require("../index");
const { db } = require("../../db/config.js");

beforeEach(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe("One-To-One: User and Deck Association Works Correctly", () => {
  test("User has one Deck", async () => {
    //Arrange
    const user = await User.create({});
    const deck = await Deck.create({});

    //Act
    await user.setDeck(deck);
    const usersDeck = await user.getDeck();

    //Assert
    expect(usersDeck.id).toBe(deck.id);
  });
});

describe("One-To-Many: Deck and Card Association Works Correctly", () => {
  test("Deck has many Cards", async () => {
    //Arrange
    const deck = await Deck.create({
      name: "Doo Doo Deck",
      xp: 69,
    });

    const card1 = await Card.create({
      name: "Doo Doo Domination",
      mojo: 69,
      stamina: 4,
      imgURL: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });

    const card2 = await Card.create({
      name: "Doo Doo Detonate",
      mojo: 44,
      stamina: 3,
      imgURL: "'http://localhost:5000/img/nimue-mistral.jpg'",
    });

    //Act
    await deck.setCards([card1, card2]);

    const deckOfCards = await Deck.findOne({
      where: { name: "Doo Doo Deck" },
      include: Card,
    });

    //Assert
    expect(deckOfCards.Cards.length).toBe(2);
    expect(deckOfCards.Cards[0].name).toBe("Doo Doo Domination");
    expect(deckOfCards.Cards[1].mojo).toBe(44);
  });
});

describe("Many-To-Many: Card and Attack Association Works Correctly", () => {
  test("Cards has many Attacks", async () => {
    //Arrange
    const card1 = await Card.create({
      name: "Doo Doo Domination",
      mojo: 69,
      stamina: 4,
      imgURL: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });

    const attack1 = await Attack.create({
      title: "Doo Doo Blast",
      mojoCost: 4,
      staminaCost: 4,
    });

    const attack2 = await Attack.create({
      title: "Doo Doo Doom",
      mojoCost: 3,
      staminaCost: 3,
    });

    //Act
    await card1.addAttacks([attack1, attack2]);

    const cardWithAttacks = await Card.findOne({
      where: { name: "Doo Doo Domination" },
      include: Attack,
    });

    //Arrange
    expect(cardWithAttacks.Attacks.length).toBe(2);
    expect(cardWithAttacks.Attacks[0].title).toBe("Doo Doo Blast");
    expect(cardWithAttacks.Attacks[1].staminaCost).toBe(3);
  });

  test("Attacks belongs to many Cards", async () => {
    //Arrange
    const attack1 = await Attack.create({
      title: "Doo Doo Blast",
      mojoCost: 4,
      staminaCost: 4,
    });

    const attack2 = await Attack.create({
      title: "Doo Doo Doom",
      mojoCost: 3,
      staminaCost: 3,
    });

    const card1 = await Card.create({
      name: "Doo Doo Domination",
      mojo: 69,
      stamina: 4,
      imgURL: "http://localhost:5000/img/arcturus-spellweaver.jpg",
    });

    const card2 = await Card.create({
      name: "Doo Doo Detonate",
      mojo: 44,
      stamina: 3,
      imgURL: "http://localhost:5000/img/nimue-mistral.jpg",
    });

    //Act
    await card1.setAttacks([attack1, attack2]);
    await card2.setAttacks([attack1, attack2]);

    const card1WithAttacks = await Card.findOne({
      where: { name: "Doo Doo Domination" },
      include: Attack,
    });
    const card2WithAttacks = await Card.findOne({
      where: { name: "Doo Doo Detonate" },
      include: Attack,
    });

    //Arrange
    expect(card1WithAttacks.Attacks[0].title).toBe("Doo Doo Blast");
    expect(card2WithAttacks.Attacks[0].title).toBe("Doo Doo Blast");
    expect(card1WithAttacks.Attacks[1].title).toBe("Doo Doo Doom");
    expect(card2WithAttacks.Attacks[1].title).toBe("Doo Doo Doom");
  });
});
