/* jshint laxbreak: true, laxcomma: true, evil: true, funcscope: true, expr: true */
// Type chart for all effectivenesses that are not 1, stolen from Safari
var TYPE_CHART = {
    "Normal": {
        "Rock": 0.5,
        "Ghost": 0,
        "Steel": 0.5
    },
    "Fighting": {
        "Normal": 2,
        "Flying": 0.5,
        "Poison": 0.5,
        "Rock": 2,
        "Bug": 0.5,
        "Ghost": 0,
        "Steel": 2,
        "Psychic": 0.5,
        "Ice": 2,
        "Dark": 2,
        "Fairy": 0.5
    },
    "Flying": {
        "Fighting": 2,
        "Rock": 0.5,
        "Bug": 2,
        "Steel": 0.5,
        "Grass": 2,
        "Electric": 0.5
    },
    "Poison": {
        "Poison": 0.5,
        "Ground": 0.5,
        "Rock": 0.5,
        "Ghost": 0.5,
        "Steel": 0,
        "Grass": 2,
        "Fairy": 2
    },
    "Ground": {
        "Flying": 0,
        "Poison": 2,
        "Rock": 2,
        "Bug": 0.5,
        "Steel": 2,
        "Fire": 2,
        "Grass": 0.5,
        "Electric": 2
    },
    "Rock": {
        "Fighting": 0.5,
        "Flying": 2,
        "Ground": 0.5,
        "Bug": 2,
        "Steel": 0.5,
        "Fire": 2,
        "Ice": 2
    },
    "Bug": {
        "Fighting": 0.5,
        "Flying": 0.5,
        "Poison": 0.5,
        "Ghost": 0.5,
        "Steel": 0.5,
        "Fire": 0.5,
        "Grass": 2,
        "Psychic": 2,
        "Dark": 2,
        "Fairy": 0.5
    },
    "Ghost": {
        "Normal": 0,
        "Ghost": 2,
        "Psychic": 2,
        "Dark": 0.5
    },
    "Steel": {
        "Rock": 2,
        "Steel": 0.5,
        "Fire": 0.5,
        "Water": 0.5,
        "Electric": 0.5,
        "Ice": 2,
        "Fairy": 2
    },
    "Fire": {
        "Rock": 0.5,
        "Bug": 2,
        "Steel": 2,
        "Fire": 0.5,
        "Water": 0.5,
        "Grass": 2,
        "Ice": 2,
        "Dragon": 0.5
    },
    "Water": {
        "Ground": 2,
        "Rock": 2,
        "Fire": 2,
        "Water": 0.5,
        "Grass": 0.5,
        "Dragon": 0.5
    },
    "Grass": {
        "Flying": 0.5,
        "Poison": 0.5,
        "Ground": 2,
        "Rock": 2,
        "Bug": 0.5,
        "Steel": 0.5,
        "Fire": 0.5,
        "Water": 2,
        "Grass": 0.5,
        "Dragon": 0.5
    },
    "Electric": {
        "Flying": 2,
        "Ground": 0,
        "Water": 2,
        "Grass": 0.5,
        "Electric": 0.5,
        "Dragon": 0.5
    },
    "Psychic": {
        "Fighting": 2,
        "Poison": 2,
        "Steel": 0.5,
        "Psychic": 0.5,
        "Dark": 0
    },
    "Ice": {
        "Flying": 2,
        "Ground": 2,
        "Steel": 0.5,
        "Fire": 0.5,
        "Water": 0.5,
        "Grass": 2,
        "Ice": 0.5,
        "Dragon": 2
    },
    "Dragon": {
        "Steel": 0.5,
        "Dragon": 2,
        "Fairy": 0
    },
    "Dark": {
        "Fighting": 0.5,
        "Ghost": 2,
        "Psychic": 2,
        "Dark": 0.5,
        "Fairy": 0.5
    },
    "Fairy": {
        "Fighting": 2,
        "Poison": 0.5,
        "Steel": 0.5,
        "Fire": 0.5,
        "Dragon": 2,
        "Dark": 2
    }
};

// List of offensive boosting moves
var offensiveBoosters = [
    "Bulk Up",
    "Calm Mind",
    "Coil",
    "Curse",
    "Dragon Dance",
    "Growth",
    "Hone Claws",
    "Howl",
    "Meditate",
    "Nasty Plot",
    "Power-Up Punch",
    "Quiver Dance",
    "Sharpen",
    "Shell Smash",
    "Shift Gear",
    "Swords Dance",
    "Tail Glow",
    "Work Up"
];

// To store the AI alt
if (!sys.fileExists(sys.scriptsFolder + "AIalt.txt")) {
    sys.writeToFile(sys.scriptsFolder + "AIalt.txt", "");
}

// For global variables
global = this;

// Defines a global variable; stays even when the script is reloaded
var setVariable = function(variable, data) {
    if (typeof(global[variable]) == "undefined") {
        global[variable] = data;
    }
};

// Global variables
setVariable("AIalt", sys.getFileContent(sys.scriptsFolder + "AIalt.txt"));
setVariable("useAI", true);
setVariable("powerList", {});
setVariable("verbose", false);
setVariable("isBoosted", []);
setVariable("firstTurn", []);
setVariable("movesUsed", {});
var hax_counter = 0
    // If the player name is not the AI alt, do not use AI
useAI = true;

// Returns the nickname of the currently active Pokemon at a given spot
var nick = function(spot) {
    return battle.data.field.poke(spot).pokemon.nick;
};

// Prints a message on the AI's battle window if the AI is set to verbose mode
var send = function(message) {
    if (verbose) {
        print(message);
    }
};

// Returns the currently active Pokemon of a given player number
var poke = function(spot) {
    return battle.data.team(spot).poke(0);
};

// Returns the currently active Pokemon of the AI
var mpoke = function() {
    return battle.data.team(battle.me).poke(0);
};

// Returns the currently active Pokemon of the opponent
var opoke = function() {
    return battle.data.team(battle.opp).poke(0);
};

// Returns the currently active Pokemon at a given spot
var fpoke = function(spot) {
    return battle.data.field.poke(spot);
};

// Returns the AI's Pokemon at a given index
var tpoke = function(index) {
    return battle.data.team(battle.me).poke(index);
};

// Calculates the type effectiveness of a given type against the foe's currently active Pokemon
var effectiveness = function(type) {
    var foe = opoke().numRef;
    var type1 = sys.type(sys.pokeType1(foe));
    var type2 = sys.type(sys.pokeType2(foe));
    var effectiveness = 1;
    if (TYPE_CHART[type] !== undefined && TYPE_CHART[type][type1] !== undefined) {
        effectiveness *= TYPE_CHART[type][type1];
    }
    if (TYPE_CHART[type] !== undefined && TYPE_CHART[type][type2] !== undefined) {
        effectiveness *= TYPE_CHART[type][type2];
    }
    if ((type == "Fire" || type == "Ice") && hasAbility(foe, "Thick Fat")) {
        effectiveness /= 2;
    }
    return effectiveness;
};

// Calculates the type effectiveness of the foe's currently active Pokemon against a given type
var foeEffectiveness = function(type) {
    var foe = opoke().numRef;
    var type1 = sys.type(sys.pokeType1(foe));
    var type2 = sys.type(sys.pokeType2(foe));
    var effectiveness = 1;
    if (TYPE_CHART[type1] && TYPE_CHART[type1][type]) {
        effectiveness *= TYPE_CHART[type1][type];
    }
    if (TYPE_CHART[type2] && TYPE_CHART[type2][type]) {
        effectiveness *= TYPE_CHART[type2][type];
    }
    return effectiveness;
};

// Checks if the given Pokemon can have the given ability
var hasAbility = function(poke, abilityName) {
    var ability = sys.abilityNum(abilityName);
    for (var i = 0; i < 3; i++) {
        if (sys.pokeAbility(poke, i) == ability) {
            return true;
        }
    }
    return false;
};

// Selects the best possible move to use based on type effectiveness against the foe's currently active Pokemon
var chooseAttack = function() {
    var move, moveType, highest = 0,
        bestMove = "none",
        foe = opoke().numRef,
        myPoke = mpoke().numRef;
    for (var i = 0; i < 4; i++) {
        move = poke(battle.me).move(i).num;
        moveType = sys.type(sys.moveType(move));
        send("The effectiveness of the move " + sys.move(move) + " against the foe's active Pokemon is " + effectiveness(moveType) + ".");

        if (moveType == "Electric" && (hasAbility(foe, "Lightning Rod") || hasAbility(foe, "Volt Absorb") || hasAbility(foe, "Motor Drive"))) {
            send("Foe could have Lightning Rod, Volt Absorb or Motor Drive; not using the Electric-type move.");
            continue;
        }
        if (moveType == "Water" && (hasAbility(foe, "Water Absorb") || hasAbility(foe, "Storm Drain") || hasAbility(foe, "Dry Skin"))) {
            send("Foe could have Water Absorb, Storm Drain or Dry Skin; not using the Water-type move.");
            continue;
        }
        if (moveType == "Grass" && hasAbility(foe, "Sap Sipper")) {
            send("Foe could have Sap Sipper; not using the Grass-type move.");
            continue;
        }
        if (moveType == "Fire" && hasAbility(foe, "Flash Fire")) {
            send("Foe could have Flash Fire; not using the Fire-type move.");
            continue;
        }
        if (moveType == "Ground" && hasAbility(foe, "Levitate")) {
            send("Foe could have Levitate; not using the Ground-type move.");
            continue;
        }

        if (movePower(move) >= 1 && effectiveness(moveType) > highest && sys.move(move) != "Fake Out" && !(sys.move(move) == "Last Resort" && movesUsed[myPoke].length <= 2)) {
            highest = effectiveness(moveType);
            bestMove = i;
        }

        if (firstTurn[myPoke] && sys.move(move) == "Fake Out" && foeEffectiveness("Normal") !== 0) {
            if (movesUsed[myPoke].indexOf(i) == -1) {
                movesUsed[myPoke].push(i);
            }
            firstTurn[myPoke] = false;
            return i;
        }

        if (isOffensiveBooster(move) && !isBoosted[myPoke] && foeEffectiveness(sys.type(sys.pokeType1(myPoke))) * foeEffectiveness(sys.type(sys.pokeType2(myPoke))) < 1) {
            send("Foe effectiveness against current Pokemon is lower than 1; stat boosting.");
            if (movesUsed[myPoke].indexOf(i) == -1) {
                movesUsed[myPoke].push(i);
            }
            isBoosted[myPoke] = true;
            return i;
        }
    }

    if (movesUsed[myPoke].indexOf(bestMove) == -1) {
        movesUsed[myPoke].push(bestMove);
    }

    return bestMove;
};

// Selects the best possible switch-in based on the foe's currently active Pokemon's type effectiveness against it, which should be as low as possible
var chooseDefensiveSwitchIn = function(switches) {
    var poke, pokeType1, pokeType2, switchInEffectiveness, lowest = Number.MAX_VALUE,
        bestSwitchIn = switches[sys.rand(0, switches.length)];
    for (var i in switches) {
        poke = sys.pokeNum(tpoke(switches[i]).pokeName);
        pokeType1 = sys.type(sys.pokeType1(poke));
        pokeType2 = sys.type(sys.pokeType2(poke));
        switchInEffectiveness = Math.min(foeEffectiveness(pokeType1), foeEffectiveness(pokeType2));
        send("The effectiveness of the foe's active Pokemon against " + sys.pokemon(poke) + " is " + switchInEffectiveness + ".");
        if (switchInEffectiveness < lowest) {
            lowest = switchInEffectiveness;
            bestSwitchIn = switches[i];
        }
    }
    return bestSwitchIn;
};

// Selects the best possible switch-in based on type effectiveness against the foe's currently active Pokemon, which should be as high as possible
var chooseOffensiveSwitchIn = function(switches) {
    var poke, pokeType1, pokeType2, switchInEffectiveness, highest = 0,
        bestSwitchIn = switches[sys.rand(0, switches.length)];
    for (var i in switches) {
        poke = sys.pokeNum(tpoke(switches[i]).pokeName);
        pokeType1 = sys.type(sys.pokeType1(poke));
        pokeType2 = sys.type(sys.pokeType2(poke));
        switchInEffectiveness = Math.max(effectiveness(pokeType1), effectiveness(pokeType2));
        send("The effectiveness of " + sys.pokemon(poke) + " against the foe's active Pokemon is " + switchInEffectiveness + ".");
        if (switchInEffectiveness > highest) {
            highest = switchInEffectiveness;
            bestSwitchIn = switches[i];
        }
    }
    return bestSwitchIn;
};

// Calculates the move power of a given move
var movePower = function(moveId) {
    if (Object.keys(powerList).length === 0) {
        var data = sys.getFileContent("db/moves/6G/power.txt").split('\n');
        for (var i = 0; i < data.length; i++) {
            var index = data[i].indexOf(' ');
            var key = data[i].substr(0, index);
            var power = data[i].substr(index + 1);
            powerList[key] = power;
        }
    }
    if (powerList[moveId] === undefined || powerList[moveId] == '1') {
        return '-';
    }
    return parseInt(powerList[moveId]);
};

// Returns whether a given move is an offensive boosting move or not.
var isOffensiveBooster = function(moveId) {
    return offensiveBoosters.indexOf(sys.move(moveId)) != -1;
};

({
    onChoiceSelection: function(player) {
        if (player !== battle.me || !useAI) {
            return;
        }

        var switches = [];
        for (var i = 1; i < 6; i++) {
            if (!tpoke(i).isKoed()) {
                switches.push(i);
            }
        }

        var random = sys.rand(0, 8);

        if (random === 0 || isBoosted[mpoke().numRef] || (fpoke(battle.me).onTheField && !poke(battle.me).isKoed() && (random != 1 || switches.length === 0))) {
            choice = {
                "slot": battle.me,
                "type": "attack",
                "attackSlot": chooseAttack()
            };
            if (choice.attackSlot == "none") {
                if (switches.length === 0) {
                    choice = {
                        "slot": battle.me,
                        "type": "attack",
                        "pokeSlot": sys.rand(0, 4)
                    };
                } else {
                    choice = {
                        "slot": battle.me,
                        "type": "switch",
                        "pokeSlot": chooseOffensiveSwitchIn(switches)
                    };
                }
            }
        } else if (poke(battle.me).isKoed()) {
            choice = {
                "slot": battle.me,
                "type": "switch",
                "pokeSlot": chooseOffensiveSwitchIn(switches)
            };
        } else {
            choice = {
                "slot": battle.me,
                "type": "switch",
                "pokeSlot": chooseDefensiveSwitchIn(switches)
            };
        }

        if (choice.type == "switch") {
            isBoosted[mpoke().numRef] = false;
        }

        battle.battleCommand(battle.id, choice);
    },

    onTierNotification: function(tier) {
        battle.battleMessage(battle.id, "Hello " + battle.data.team(battle.opp).name + "! I am The Best Bot, I will be the victor of this battle!");
    },
    onChoiceCancellation: function(player) {
        this.onChoiceSelection(player);
    },

    onDrawRequest: function(player) {
        this.onChoiceCancelled(player);
    },

    onChoiceCancelled: function(player) {
        useAI = !useAI;
        print("The cancel button was clicked or a draw request was made, so the AI has been disabled.");
    },

    onSendOut: function(spot, previndex, pokemon, silent) {
        if (spot === battle.me) {
            var myPoke = poke(spot).numRef;
            firstTurn[myPoke] = true;
            movesUsed[myPoke] = [];
        }
    },
    onSpectatorJoin: function(id, name) {
        battle.battleMessage(battle.id, "Hello " + name + "!");
    },
    // onBeginTurn : function(turn) {
    //  send("Turn " + turn + " of the battle!");
    // },
    onCriticalHit: function(spot) {
        if (spot === battle.me) {
            battle.battleMessage(battle.id, "Hax!! >:(");
            hax_counter++
        } else {
            battle.battleMessage(battle.id, "Hehe, thanks hax!")

        }
    },
    onFlinch: function(spot) {
        if (spot === battle.me) {
            battle.battleMessage(battle.id, "Hax!! >:(");
            hax_counter++
        } else {
            battle.battleMessage(battle.id, "Hehe, thanks hax!")

        }
    },
    onMiss: function(spot) {
        if (spot === battle.me) {
            battle.battleMessage(battle.id, "Hax!! >:(");
            hax_counter++
        } else {
            battle.battleMessage(battle.id, "Hehe, thanks hax!")
        }
    },
    onBattleEnd: function(result, winner) {
        if (hax_counter >= 12) {
            if (winner == battle.me) {
                battle.battleMessage(battle.id, "Wow Hax was on my side!")
            } else {
                battle.battleMessage(battle.id, "You only won cause hax")
            }
        } else {
            battle.battleMessage(battle.id, "Good game!")
        }
    },
    onKo: function(spot) {
        battle.battleMessage(battle.id, "Oh no! " + nick(spot) + " fainted!");
    },
    onDamageDone: function(spot, damage) {
        if (spot == battle.me) {
            battle.battleMessage(battle.id, "My " + nick(spot) + " took " + damage + " damage!");
        } else {
            battle.battleMessage(battle.id, nick(spot) + " took " + damage + "% damage!");
        }
    },
    onPlayerMessage: function(player, message) {
        if (player === battle.me) {
            if (message == "/verbose") {
                verbose = !verbose;
            } else if (message.substr(0, 6) == "/eval ") {
                sys.eval(message.slice(6));
            } else if (message.substr(0, 5) == "/alt ") {
                AIalt = message.slice(5);
                sys.writeToFile(sys.scriptsFolder + "AIalt.txt", AIalt);
                print("The AI alt has been set to '" + AIalt + "'.");
            }
        }
    }
})
