
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
    if (this.hicounter < this.maxhis) {
        battle.battleMessage(battle.id, "Hello " + name + "!");
        this.hicounter++;
        if (this.hicounter == this.maxhis) {
            battle.battleMessage(battle.id, "Hello Function turned off.");
        }
    }
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
// End of bot
var myGlobalPokeNum, oppGlobalPokeNum;
var updatedUser = false;
var updatedOpp = false;
var flag = true;

function mod(dividend, divisor) { //dividend % divisor: returns [quotient, remainder]
    var i = 0;
    var quot = dividend;
    var div = divisor;
    while (quot > div) {
        quot = quot - div;
        i++;
        
        if(i>6) {
            break;
        }
    }
    return [quot, i];
}

function searchMap(key, map) {
    var minIndex = 0;
    var maxIndex = map.length - 1;
    var f, data;
    for (var i = 0; i < map.length; i++) {
        data = map[i].split(' ');
        if (key == data[0]) {
            if (data.length < 3) {
                
                return data[1];
        }
            else {
                return data.slice(1);
            }
        }        
    }
    return -1;
    
}

function pokeKey(pokeNum) { //generate the key to find Pokemon in db tables;necessary because of Mega Evos and other formes
    var modulo = mod(pokeNum, 65536);
    return modulo[0].toString().concat(':', modulo[1].toString());
}

function calcStat(baseStat, lv, natureMod, EV, IV) {
    //print('BS: ' + baseStat + ' ___ lv ' + lv + ' ___ nmod ' + natureMod + ' ___ ev ' + EV + ' ___ iv ' + IV);
    var stat = Math.floor((Math.floor(Math.floor((IV + (2*baseStat) + Math.floor(EV/4)) * lv) / 100) + 5) * natureMod);
    return stat;    
}

function calcHP(baseStat, lv, EV, IV) {    
    var HP = Math.floor(Math.floor((IV + (2*baseStat) + Math.floor(EV/4) + 100) * lv) / 100) + 10;
    return HP;    
}

function natureModifier(nature) { //return nature modifier for stats, in order: atk, def, satk, sdef, spe
    nMod = [1, 1, 1, 1, 1];
    switch (nature) {
        case 1:
            nMod[0] = 1.1;
            nMod[1] = 0.9;
            break;
        case 2:
            nMod[0] = 1.1;
            nMod[4] = 0.9;
            break;
        case 3:
            nMod[0] = 1.1;
            nMod[2] = 0.9;
            break;
        case 4:
            nMod[0] = 1.1;
            nMod[3] = 0.9;
            break;
        case 5:
            nMod[1] = 1.1;
            nMod[0] = 0.9;
            break;
        case 7:
            nMod[1] = 1.1;
            nMod[4] = 0.9;
            break;
        case 8:
            nMod[1] = 1.1;
            nMod[2] = 0.9;
            break;
        case 9:
            nMod[1] = 1.1;
            nMod[3] = 0.9;
            break;
        case 10:
            nMod[4] = 1.1;
            nMod[0] = 0.9;
            break;
        case 11:
            nMod[4] = 1.1;
            nMod[1] = 0.9;
            break;
        case 13:
            nMod[4] = 1.1;
            nMod[2] = 0.9;
            break;
        case 14:
            nMod[4] = 1.1;
            nMod[3] = 0.9;
            break;
        case 15:
            nMod[2] = 1.1;
            nMod[0] = 0.9;
            break;
        case 16:
            nMod[2] = 1.1;
            nMod[1] = 0.9;
            break;
        case 17:
            nMod[2] = 1.1;
            nMod[4] = 0.9;
            break;
        case 19:
            nMod[2] = 1.1;
            nMod[3] = 0.9;
            break;
        case 20:
            nMod[3] = 1.1;
            nMod[0] = 0.9;
            break;
        case 21:
            nMod[3] = 1.1;
            nMod[1] = 0.9;
            break;
        case 22:
            nMod[3] = 1.1;
            nMod[4] = 0.9;
            break;
        case 23:
            nMod[3] = 1.1;
            nMod[2] = 0.9;
            break;
    }
    return nMod;
        
}

function typeModifier(attackType, defenseType) {
    var typeTable = sys.getFileContent('db/types/6G/typestable.txt').split('\n');
    var attackArray = typeTable[attackType].split(' ');
    var modifier = attackArray[defenseType+1];
    return modifier/2;
}

function moveObject(moveNum) {
    /*
    / Properties:
    / power - Base Power
    / type - Type
    / atkstat - User's stat used to calculate the attack;1 = atk, 2 = satk, -1 = not applicable
    / defstat - Target's stat used to calculate the defense;1 = def, 2 = sdef, -1 = not applicable
    */
    this.moveNum = moveNum;
    var powerData = sys.getFileContent('db/moves/6G/power.txt').split('\n');
    this.name = sys.move(moveNum);
    this.power = searchMap(moveNum, powerData);
    this.type = sys.moveType(moveNum);
    var classData = sys.getFileContent('db/moves/6G/damage_class.txt').split('\n');
    var moveClass = searchMap(moveNum, classData);
    this.atkstat = moveClass;
    this.defstat = moveClass;
        
}

function pokeObject(pokeNum, level, EV, IV, natureMod) {
    /*
     *Properties:
     *pokeNum, level, natureMod - parameters
     *hp, atk, def, satk, sdef, spe - Pokemon's stats
     *type1, type2 - Pokemon's type(s)
     *ability1, ability2, ability3 - Pokemon's abilities
     * 
     */

    this.pokeNum = pokeNum;
    this.level = level;
    this.natureMod = natureMod;
        
    this.type1 = sys.pokeType1(pokeNum, 6);
    this.type2 = sys.pokeType2(pokeNum, 6);
    
    //calculate stats if EVs and IVs given; otherwise, 
    if (typeof EV !== 'undefined' && typeof IV !== 'undefined' && typeof natureMod !== 'undefined') { //will be true for user's Pokemon, not true for opponent's Pokemon
        var statData = sys.getFileContent('db/pokes/6G/stats.txt').split('\n');
        var pKey = pokeKey(pokeNum);
        var statArray = searchMap(pKey, statData);
        
        var basehp = statArray[0];
        var baseatk = statArray[1];
        var basedef = statArray[2];
        var basesatk = statArray[3];
        var basesdef = statArray[4];
        var basespe = statArray[5];
        
        this.hp = calcHP(basehp, level, EV[0], IV[0]);
        this.atk = calcStat(baseatk, level, natureMod[0], EV[1], IV[1]);
        this.def = calcStat(basedef, level, natureMod[1], EV[2], IV[2]);
        this.satk = calcStat(basesatk, level, natureMod[2], EV[3], IV[3]);
        this.sdef = calcStat(basesdef, level, natureMod[3], EV[4], IV[4]);
        this.spe = calcStat(basespe, level, natureMod[4], EV[5], IV[5]);
        
        //print (sys.pokemon(pokeNum) + '\'s stats are HP:' + this.hp + ' EV: ' + EV[0] + ' | ATK:' + this.atk + ' EV: ' + EV[1] + ' | DEF:' + this.def + ' EV: ' + EV[2] + ' | SATK:' + this.satk + ' EV: ' + EV[3] + ' | SDEF:' + this.sdef + ' EV: ' + EV[4] + ' | SPE:' + this.spe + ' EV: ' + EV[5]);
        
    } else { //placeholder values --> not calculated
        this.hp = -1;
        this.atk = -1;
        this.def = -1;
        this.satk = -1;
        this.sdef = -1;
        this.spe = -1;
        
    }

}

function generatePokeObjArray(poke) {
    var output;
    if (poke.atk != -1) { //if poke already has stats, return array with just poke
        output = [poke];
        return output;
    }
    
    var defaultNature = [1, 1, 1, 1, 1];
    var plusNature = [1.1, 1.1, 1.1, 1.1, 1];
    var zeroEV = [0, 0, 0, 0, 0, 0];
    var maxEV = [252, 252, 0, 252, 0, 0];
    var maxplusEV = [252, 252, 252, 252, 252, 0];
    var defaultIV = [31, 31, 31, 31, 31 ,31];
    
    //generate array with appropriate assumed stats
    output = [new pokeObject(poke.pokeNum, poke.level, zeroEV, defaultIV, defaultNature), new pokeObject(poke.pokeNum, poke.level, maxEV, defaultIV, defaultNature), new pokeObject(poke.pokeNum, poke.level, maxplusEV, defaultIV, plusNature)];
    return output;

}

function damageCalc(atkPokeObj, defPokeObj, moveObj, atkItem) {
    /*  Parameters:
     *      atkPokeObj -> complete pokeObject
     *      defPokeObj -> partial pokeObject, missing EV/IV -> missing stats        
     *      moveObj -> complete moveObject
     *      item -> item ID for item modifier
     *
     *  Output:
     *      output -> array of 3 strings containing % damage range, for 0/0, 252/0, 252/252+ HP/(S)Def EV spread respectively
     *      -1 -> moveObj is not an attacking move
     *
     *
     */
    
    var typeMod = typeModifier(moveObj.type, defPokeObj.type1)*typeModifier(moveObj.type, defPokeObj.type2);
    if (moveObj.type == atkPokeObj.type1 || moveObj.type == atkPokeObj.type2) {
        var STABMod = 1.5;
    } else {
        var STABMod = 1;
    }
    //see http://www.smogon.com/dp/articles/damage_formula for information on modifiers
    var mod1 = 1; //will implement later
    var mod2 = 1; //will implement later
    var mod3 = 1; //will implement later
    

    var atkPokeObjArr = generatePokeObjArray(atkPokeObj); //array to hold 3 default assumed EV spreads (0, 252, 252+) (S)Atk for calculations
    var defPokeObjArr = generatePokeObjArray(defPokeObj); //array to hold 3 default assumed EV spreads (0/0, 252/0, 252/252+) HP/(S)Def for calculations
    
    //instantiate variables for the for loops
    var attack = 0;
    var defense = 1;
    var mindmg, maxdmg, mindmgpercent, maxdmgpercent;
    var output = [];
    
    //loop through for each poke in array for various spreads
    
    for (var i = 0; i < atkPokeObjArr.length; i++) {
        if (moveObj.atkstat == 1) {
            attack = atkPokeObjArr[i].atk;
        }
        if (moveObj.atkstat == 2) {
            attack = atkPokeObjArr[i].satk;
        }
        
        for (var j = 0; j < defPokeObjArr.length; j++) {
            if (moveObj.defstat == 1) {
                defense = defPokeObjArr[j].def;
            }
            if (moveObj.defstat == 2) {
                defense = defPokeObjArr[j].sdef;
            }
            
            //damage formula: http://www.smogon.com/dp/articles/damage_formula
            mindmg = Math.floor(Math.floor(Math.floor(Math.floor((Math.floor((Math.floor(Math.floor(Math.floor(((Math.floor(Math.floor(2 * atkPokeObj.level)/5)+2)*moveObj.power*attack)/50)/defense)*mod1)+2)*mod2)*85)/100)*STABMod)*typeMod)*mod3);
            maxdmg = Math.floor(Math.floor(Math.floor(Math.floor((Math.floor((Math.floor(Math.floor(Math.floor(((Math.floor(Math.floor(2 * atkPokeObj.level)/5)+2)*moveObj.power*attack)/50)/defense)*mod1)+2)*mod2)*100)/100)*STABMod)*typeMod)*mod3);
            
            //round percentages to nearest tenth
            mindmgpercent = Math.round((mindmg/defPokeObjArr[j].hp)*1000)/10;
            maxdmgpercent = Math.round((maxdmg/defPokeObjArr[j].hp)*1000)/10;
            
            output.push(mindmgpercent.toString() + '% - ' + maxdmgpercent.toString() + '%');
            
        }
    }

    return output;
    
}
    


({

    onDefiniteFormeChange : function (spot, poke, newPoke) {
        if (spot == battle.me) {
                myGlobalPokeNum = newPoke;
                updatedUser = true;
        }
        if (spot == battle.opp) {
                oppGlobalPokeNum = newPoke;
                updatedOpp = true;
        }
    },
    
    onSendOut : function (spot, previndex, pokemon, silent) {
        if (spot == battle.me) {
            updatedUser = false;
        }
        if (spot == battle.opp) {
            updatedOpp = false;
        }    
    },

    onChoiceSelection : function (player) {
        if (player == battle.me) {
            if (!battle.data.field.poke(battle.me).pokemon.isKoed()) {
                var myFPoke = battle.data.field.poke(battle.me);
                var myPoke = myFPoke.pokemon;
                if (!updatedUser) {
                    myGlobalPokeNum = myPoke.numRef;
                    updatedUser = true;
                }
                var oppFPoke = battle.data.field.poke(battle.opp);
                var oppPoke = oppFPoke.pokemon;
                if (!updatedOpp) {
                    oppGlobalPokeNum = oppPoke.numRef;
                    updatedOpp = true;
                }
                var myMoveNums = [myPoke.move(0).num, myPoke.move(1).num, myPoke.move(2).num, myPoke.move(3).num];
                var oppMoveNums = [oppPoke.move(0).num, oppPoke.move(1).num, oppPoke.move(2).num, oppPoke.move(3).num];                
                var move, moveObj;
                var EVs = [myPoke.ev(0), myPoke.ev(1), myPoke.ev(2), myPoke.ev(3), myPoke.ev(4), myPoke.ev(5), myPoke.ev(6)];
                var IVs = [myPoke.iv(0), myPoke.iv(1), myPoke.iv(2), myPoke.iv(3), myPoke.iv(4), myPoke.iv(5), myPoke.iv(6)];
                var natureMod = natureModifier(myPoke.nature);
                var myPokeObj = new pokeObject(myGlobalPokeNum, myPoke.level, EVs, IVs, natureMod);
                var myOppIntObj = new pokeObject(oppGlobalPokeNum, oppPoke.level);
                var myItem = myPoke.item;
                var dmgcalc;
                
                var myFPoke = battle.data.field.poke(battle.me); 
                
                for (var i = 0; i < myMoveNums.length; i++) {
                    moveObj = new moveObject(myMoveNums[i]);
                    if (moveObj.atkstat != 1 && moveObj.atkstat != 2) {
                        continue;
                    }
                    if (i == 0) {
                        print('My Pokemon:');
                    }
                    dmgcalc = damageCalc(myPokeObj, myOppIntObj, moveObj, myItem);
                    print(myPoke.nick + ': ' + sys.move(myMoveNums[i]) + ' - ' + dmgcalc[0] + ' | ' + dmgcalc[1] + ' | ' + dmgcalc[2]);
                }
                
                for (var i = 0; i < oppMoveNums.length; i++) {
                    moveObj = new moveObject(oppMoveNums[i]);
                    if (moveObj.atkstat != 1 && moveObj.atkstat != 2) {
                        continue;
                    }
                    if (i == 0) {
                        print();
                        print("Opponent's Pokemon:");
                    }
                    dmgcalc = damageCalc(myOppIntObj, myPokeObj, moveObj, myItem);
                    print(oppPoke.nick + ': ' + sys.move(oppMoveNums[i]) + ' - ' + dmgcalc[0] + ' | ' + dmgcalc[1] + ' | ' + dmgcalc[2]);
                }
            }
        }
    }    
});
})
