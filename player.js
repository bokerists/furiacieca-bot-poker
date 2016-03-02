'use strict';

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
  '2': 10,
  '3': 10,
  '4': 10,
  '5': 10,
  '6': 10,
  '7': 10,
  '8': 10,
  '9': 10,
  '10': 30,
  'J': 40,
  'Q': 60,
  'K': 80,
  'A': 100,
}

exports = module.exports = {

  VERSION: 'Superstar poker player',

  bet: function (gamestate, bet) {

    var me = gamestate.players[gamestate.me];
    var hand = gamestate.commonCards.concat(me.cards);
    var numPlayers = _.filter(gamestate.players, function(g) { return g.status == 'active'} ).length;
    var highCards = ['K', 'J', 'Q', 'A'];

    //console.log('numPlayers', numPlayers)


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
      ourBet = gamestate.callAmount + mapVal[poker] * 3;
    } else if (tris) {
      ourBet = gamestate.callAmount + mapVal[tris] * 2;
    } else if (pair) {
      ourBet = gamestate.callAmount + mapVal[pair];
    }

    if (_.find(highCards, tris) != undefined) {
      console.log('high tris')
    }

    if (numPlayers == 2 && poker !== false) {
      ourBet = Infinity;
    }

    

    return bet(ourBet);

  }

};
