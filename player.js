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
  var pairs = _.filter(occ, function(elem) {
    return elem == 2;
  })
  return pairs.length > 0
}


exports = module.exports = {

  VERSION: 'Superstar poker player',

  bet: function (gamestate, bet) {

    var me = gamestate.players[gamestate.me];
    var hand = gamestate.commonCards.concat(me.cards);

    var hasPair = hasPair(hand);

    var ourBet = 0;

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
