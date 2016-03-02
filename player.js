var _ = require("lodash");

var getRank = function(cards) {
  return _.map(cards, function(card) {
    return card.rank;
  })
}

var getOccurencies = function(cards) {
  var ranks = getRank(cards);
  
   var count = {};
    ranks.forEach(function(rank) {
        if (typeof count[rank] === 'undefined') {
          count[rank] = 1;
        } else {
          count[rank] += 1;
        }
    });
  
  return count; 
}

var hasPair = function(cards) {
  var grouped = _.groupBy(cards, 'rank');
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) { 
      var arrayOfCards = grouped[key];
      if (arrayOfCards.length == 2) {
        return key;
      }
    }
  }
  return false;
}

var hasTris = function(cards) {
  var grouped = _.groupBy(cards, 'rank');
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) { 
      var arrayOfCards = grouped[key];
      if (arrayOfCards.length == 3) {
        return key;
      }
    }
  }
  return false;
}

var hasPoker = function(cards) {
  var grouped = _.groupBy(cards, 'rank');
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) { 
      var arrayOfCards = grouped[key];
      if (arrayOfCards.length == 4) {
        return key;
      }
    }
  }
  return false;
}

var mapVal = {
  '1': 2,
  '2': 1.1,
  '3': 1.1,
  '4': 1.1,
  '5': 1.1,
  '6': 1.1,
  '7': 1.1,
  '8': 1.1,
  '9': 1.1,
  '10': 1.3,
  'J': 1.4,
  'Q': 1.6,
  'K': 1.8
}

exports = module.exports = {

  VERSION: 'Superstar poker player',

  bet: function (gamestate, bet) {

    var me = gamestate.players[gamestate.me];
    var hand = gamestate.commonCards.concat(me.cards);

    var pair = hasPair(hand);
    var tris = hasTris(hand);
    var poker = hasPoker(hand);

    if (gamestate.commonCards.length < 3) {
        if (!pair) {
          return bet(gamestate.callAmount);
        }
    }
   
    var ourBet = 0;

    if (gamestate.commonCards.length < 5) {
      ourBet = gamestate.callAmount;
    }

    
    if (poker) {
      ourBet = gamestate.callAmount * mapVal[poker] * 2;
    } else if (tris) {
      ourBet = gamestate.callAmount * mapVal[tris] * 1.2;
    } else if (pair) {
      ourBet = gamestate.callAmount * mapVal[pair];
    }


    //
    // gamestate contains info about the state of the game.
    // check the documentation at https://bot-poker.herokuapp.com/wiki for further info about the data structure.

    //
    // bet is the function you should use to send your bet.



    // enjoy the game!



    //
    // currently we just go all-in every single hand!

    'use strict';

    return bet(ourBet);

  }

};
