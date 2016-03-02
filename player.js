var _ = require("lodash");

var getRank = function(cards) {
  return _.map(cards, function(card) {
    return card.rank;
  })
}

var getOccurencies = function(cards) {
  var ranks = getRank(cards);
  
   var count = {};
    ranks.forEach(function(rank){
      
      
    
        if (typeof count[rank] === 'undefined') {
          count[rank] = 1;
        } else {
          count[rank] += 1;
        }
 
    });
  
  return count; 
}

var hasPair = function(cards) {
  var occ = getOccurencies(cards); 
  var pairs = _.filter(occ, function(elem) { return elem == 2; });
  return pairs.length > 0
}

var hasTris = function(cards) {
  var occ = getOccurencies(cards); 
  var pairs = _.filter(occ, function(elem) { return elem == 3; });
  return pairs.length > 0
}

var hasPoker = function(cards) {
  var occ = getOccurencies(cards); 
  var pairs = _.filter(occ, function(elem) { return elem == 4; });
  return pairs.length > 0
}

exports = module.exports = {

  VERSION: 'Superstar poker player',

  bet: function (gamestate, bet) {

    var me = gamestate.players[gamestate.me];
    var hand = gamestate.commonCards.concat(me.cards);

    var hasPair = hasPair(hand);
    var hasTris = hasTris(hand);
    var hasPoker = hasPoker(hand);


   

    if (gamestate.commonCards.length < 3) {
      return bet(gamestate.callAmount);
    }

    var ourBet = 0;

    if (hasPoker) {
      ourBet = gamestate.callAmount * 2;
    } else if (hasTris) {
      ourBet = gamestate.callAmount * 1.2;
    } else if (hasPair) {
      ourBet = gamestate.callAmount;
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
