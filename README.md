## deck-builder
# Context

Magic the Gathering has been a card game for about 20 years (https://en.wikipedia.org/wiki/Magic:TheGathering). The principle is quite simple behind. You have a set of cards that produce mana inside your deck and the other cards of the deck need some mana to be played. The cards that produce mana are called land. The others are spells, rituals, creatures, artifacts, or enchantments.

# Rules
 
A deck is a collection of at least 20 cards and a maximum of 30. (60 in the game, but it's easier with a smaller number ;) )
Land don't have a mana cost
We should display the average mana cost of the deck even if the number of cards has not reached 20.
We can't have more than 30 cards in a deck.
# API

You can use the following API to gather the data you need → https://docs.magicthegathering.io/

Inside the card endpoint, you have the CMC, which is the converted mana cost. This is the value you should play with.

# Requirement

We would like you to create a new application that allows you to search for cards, add them to a deck, and get the average mana cost of the cards that aren't land inside the deck.

The goal is that you showcase your mastery. Please provide some Readme with an explanation of what you did.