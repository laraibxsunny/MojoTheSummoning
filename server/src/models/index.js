const { User } = require("./User");
const { Attack } = require("./Attack");
const { Deck } = require("./Deck");
const { Card } = require("./Card");

User.hasOne(Deck);
Deck.belongsTo(User);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, { through: "CardAttacks" });
Attack.belongsToMany(Card, { through: "CardAttacks" });

module.exports = {
  User,
  Deck,
  Card,
  Attack,
};
