
var useAI=true;

var channel = 0;

var nick = function(spot) { return battle.data.field.poke(spot).pokemon.nick; };
var verb = true;
var send = function(msg) {
   if (!verb) /*print (msg)*/;
   else client.network().sendChanMessage(channel, msg);
};

var poke = function(spot) { return battle.data.team(spot).poke(0);};
var fpoke = function(spot) { return battle.data.field.poke(spot);};
var tpoke = function(ind) { return battle.data.team(battle.me).poke(ind);};

({
onTierNotification: function (tier) {
    battle.battleMessage(battle.id, "Hello "+ battle.data.team(battle.opp).name +"! I am The Best Bot, I will be the victor of this battle!");
},

hicounter: 0,
maxhis: 333333333333333333333333333333333333333333333,

onSpectatorJoin: function (id, name) {
        battle.battleMessage(battle.id, "Hello " + name + "!");
},
// onBeginTurn : function(turn) {
  //  send("Turn " + turn + " of the battle!");
// },
onKo : function(spot) {
    battle.battleMessage(battle.id, "Oh no! " + nick(spot) + " fainted!");
},
onDamageDone: function(spot, damage) {
    if (spot == battle.me) {
        battle.battleMessage(battle.id, ":(( My " + nick(spot) + " lost " + damage + " HP!");
    } else {
       battle.battleMessage(battle.id, nick(spot) + " lost " + damage + "% ;D !");
    }
},
onChoiceSelection: function(player) {
    if (player!=battle.me || !useAI) {
        return;
    }
    var switches = [];
    for (var i = 1; i < 6; i++) {
        if (!tpoke(i).isKoed()) {
           switches.push(i);
        }
    }

   var r = sys.rand(0, 8);

    if (r == 0 || (fpoke(battle.me).onTheField && !poke(battle.me).isKoed() && (r != 1 || switches.length == 0))) {
        choice = {"slot": battle.me, "type":"attack", "attackSlot":sys.rand(0,4)};
    } else {
        var cswitch = switches[sys.rand(0,switches.length)];

        choice = {"slot": battle.me, "type":"switch", "pokeSlot": cswitch};
    }
    battle.battleCommand(battle.id, choice);
},
onChoiceCancellation: function(player) {
    this.onChoiceSelection(player);
},
onDrawRequest: function (player) {
    this.onChoiceCancelled(player);
},
onChoiceCancelled: function(player) {
//    print ("old useAI: " + useAI);
    useAI = !useAI;
    print ("new useAI: " + useAI);
}
,
onPlayerMessage: function(player, message) {
    if (player == battle.me) {
        if (message == "annoy") {
            verb = true;
        } else if (message == "debug") {
            verb = false;
        } else if (message.substr(0, 5) == "eval ") {
             sys.eval(message.substr(5));
        }
    }
}
})
