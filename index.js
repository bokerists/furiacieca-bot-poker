var player = require('./player.js');

var hand = [ {rank: '2', type: 'D'}, {rank: 'Q', type: 'S'}];

var table = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: 'K', type: 'T'} ];


var gamestate = {
    "game": 2,
    "round": 1,
    "spinCount": 2,
    "sb": 2,
    "pot": 100,
    "commonCards": table,
    "players": [{
    	status: 'active',
    	cards: hand
    }, {
    	status: 'active',
    	cards: []
    }, {
    	status: 'folded',
    	cards: []
    }],
    // Index of the current player.
    "me": 0,

    "callAmount": 10

};


player.bet(gamestate, function(amount) {

	console.log(amount);

})