var TYPE_CHART = {
        Normal: {
            Rock: .5,
            Ghost: 0,
            Steel: .5
        },
        Fighting: {
            Normal: 2,
            Flying: .5,
            Poison: .5,
            Rock: 2,
            Bug: .5,
            Ghost: 0,
            Steel: 2,
            Psychic: .5,
            Ice: 2,
            Dark: 2,
            Fairy: .5
        },
        Flying: {
            Fighting: 2,
            Rock: .5,
            Bug: 2,
            Steel: .5,
            Grass: 2,
            Electric: .5
        },
        Poison: {
            Poison: .5,
            Ground: .5,
            Rock: .5,
            Ghost: .5,
            Steel: 0,
            Grass: 2,
            Fairy: 2
        },
        Ground: {
            Flying: 0,
            Poison: 2,
            Rock: 2,
            Bug: .5,
            Steel: 2,
            Fire: 2,
            Grass: .5,
            Electric: 2
        },
        Rock: {
            Fighting: .5,
            Flying: 2,
            Ground: .5,
            Bug: 2,
            Steel: .5,
            Fire: 2,
            Ice: 2
        },
        Bug: {
            Fighting: .5,
            Flying: .5,
            Poison: .5,
            Ghost: .5,
            Steel: .5,
            Fire: .5,
            Grass: 2,
            Psychic: 2,
            Dark: 2,
            Fairy: .5
        },
        Ghost: {
            Normal: 0,
            Ghost: 2,
            Psychic: 2,
            Dark: .5
        },
        Steel: {
            Rock: 2,
            Steel: .5,
            Fire: .5,
            Water: .5,
            Electric: .5,
            Ice: 2,
            Fairy: 2
        },
        Fire: {
            Rock: .5,
            Bug: 2,
            Steel: 2,
            Fire: .5,
            Water: .5,
            Grass: 2,
            Ice: 2,
            Dragon: .5
        },
        Water: {
            Ground: 2,
            Rock: 2,
            Fire: 2,
            Water: .5,
            Grass: .5,
            Dragon: .5
        },
        Grass: {
            Flying: .5,
            Poison: .5,
            Ground: 2,
            Rock: 2,
            Bug: .5,
            Steel: .5,
            Fire: .5,
            Water: 2,
            Grass: .5,
            Dragon: .5
        },
        Electric: {
            Flying: 2,
            Ground: 0,
            Water: 2,
            Grass: .5,
            Electric: .5,
            Dragon: .5
        },
        Psychic: {
            Fighting: 2,
            Poison: 2,
            Steel: .5,
            Psychic: .5,
            Dark: 0
        },
        Ice: {
            Flying: 2,
            Ground: 2,
            Steel: .5,
            Fire: .5,
            Water: .5,
            Grass: 2,
            Ice: .5,
            Dragon: 2
        },
        Dragon: {
            Steel: .5,
            Dragon: 2,
            Fairy: 0
        },
        Dark: {
            Fighting: .5,
            Ghost: 2,
            Psychic: 2,
            Dark: .5,
            Fairy: .5
        },
        Fairy: {
            Fighting: 2,
            Poison: .5,
            Steel: .5,
            Fire: .5,
            Dragon: 2,
            Dark: 2
        }
    },
    offensiveBoosters = ["Bulk Up", "Calm Mind", "Coil", "Curse", "Dragon Dance", "Growth", "Hone Claws", "Howl", "Meditate", "Nasty Plot", "Power-Up Punch", "Quiver Dance", "Sharpen", "Shell Smash", "Shift Gear", "Swords Dance", "Tail Glow", "Work Up"];
sys.fileExists(sys.scriptsFolder + "AIalt.txt") || sys.writeToFile(sys.scriptsFolder + "AIalt.txt", ""), global = this;
var setVariable = function(e, s) {
    "undefined" == typeof global[e] && (global[e] = s)
};
setVariable("AIalt", sys.getFileContent(sys.scriptsFolder + "AIalt.txt")), setVariable("useAI", !0), setVariable("powerList", {}), setVariable("verbose", !1), setVariable("isBoosted", []), setVariable("firstTurn", []), setVariable("movesUsed", {});
var hax_counter = 0;
useAI = !0;
var nick = function(e) {
        return battle.data.field.poke(e).pokemon.nick
    },
    send = function(e) {
        verbose && print(e)
    },
    poke = function(e) {
        return battle.data.team(e).poke(0)
    },
    mpoke = function() {
        return battle.data.team(battle.me).poke(0)
    },
    opoke = function() {
        return battle.data.team(battle.opp).poke(0)
    },
    fpoke = function(e) {
        return battle.data.field.poke(e)
    },
    tpoke = function(e) {
        return battle.data.team(battle.me).poke(e)
    },
    effectiveness = function(e) {
        var s = opoke().numRef,
            t = sys.type(sys.pokeType1(s)),
            o = sys.type(sys.pokeType2(s)),
            i = 1;
        return void 0 !== TYPE_CHART[e] && void 0 !== TYPE_CHART[e][t] && (i *= TYPE_CHART[e][t]), void 0 !== TYPE_CHART[e] && void 0 !== TYPE_CHART[e][o] && (i *= TYPE_CHART[e][o]), "Fire" != e && "Ice" != e || !hasAbility(s, "Thick Fat") || (i /= 2), i
    },
    foeEffectiveness = function(e) {
        var s = opoke().numRef,
            t = sys.type(sys.pokeType1(s)),
            o = sys.type(sys.pokeType2(s)),
            i = 1;
        return TYPE_CHART[t] && TYPE_CHART[t][e] && (i *= TYPE_CHART[t][e]), TYPE_CHART[o] && TYPE_CHART[o][e] && (i *= TYPE_CHART[o][e]), i
    },
    hasAbility = function(e, s) {
        for (var t = sys.abilityNum(s), o = 0; 3 > o; o++)
            if (sys.pokeAbility(e, o) == t) return !0;
        return !1
    },
    chooseAttack = function() {
        for (var e, s, t = 0, o = "none", i = opoke().numRef, r = mpoke().numRef, n = 0; 4 > n; n++)
            if (e = poke(battle.me).move(n).num, s = sys.type(sys.moveType(e)), send("The effectiveness of the move " + sys.move(e) + " against the foe's active Pokemon is " + effectiveness(s) + "."), "Electric" == s && (hasAbility(i, "Lightning Rod") || hasAbility(i, "Volt Absorb") || hasAbility(i, "Motor Drive"))) send("Foe could have Lightning Rod, Volt Absorb or Motor Drive; not using the Electric-type move.");
            else if ("Water" == s && (hasAbility(i, "Water Absorb") || hasAbility(i, "Storm Drain") || hasAbility(i, "Dry Skin"))) send("Foe could have Water Absorb, Storm Drain or Dry Skin; not using the Water-type move.");
        else if ("Grass" == s && hasAbility(i, "Sap Sipper")) send("Foe could have Sap Sipper; not using the Grass-type move.");
        else if ("Fire" == s && hasAbility(i, "Flash Fire")) send("Foe could have Flash Fire; not using the Fire-type move.");
        else if ("Ground" == s && hasAbility(i, "Levitate")) send("Foe could have Levitate; not using the Ground-type move.");
        else {
            if (movePower(e) >= 1 && effectiveness(s) > t && "Fake Out" != sys.move(e) && !("Last Resort" == sys.move(e) && movesUsed[r].length <= 2) && (t = effectiveness(s), o = n), firstTurn[r] && "Fake Out" == sys.move(e) && 0 !== foeEffectiveness("Normal")) return -1 == movesUsed[r].indexOf(n) && movesUsed[r].push(n), firstTurn[r] = !1, n;
            if (isOffensiveBooster(e) && !isBoosted[r] && foeEffectiveness(sys.type(sys.pokeType1(r))) * foeEffectiveness(sys.type(sys.pokeType2(r))) < 1) return send("Foe effectiveness against current Pokemon is lower than 1; stat boosting."), -1 == movesUsed[r].indexOf(n) && movesUsed[r].push(n), isBoosted[r] = !0, n
        }
        return -1 == movesUsed[r].indexOf(o) && movesUsed[r].push(o), o
    },
    chooseDefensiveSwitchIn = function(e) {
        var s, t, o, i, r = Number.MAX_VALUE,
            n = e[sys.rand(0, e.length)];
        for (var a in e) s = sys.pokeNum(tpoke(e[a]).pokeName), t = sys.type(sys.pokeType1(s)), o = sys.type(sys.pokeType2(s)), i = Math.min(foeEffectiveness(t), foeEffectiveness(o)), send("The effectiveness of the foe's active Pokemon against " + sys.pokemon(s) + " is " + i + "."), r > i && (r = i, n = e[a]);
        return n
    },
    chooseOffensiveSwitchIn = function(e) {
        var s, t, o, i, r = 0,
            n = e[sys.rand(0, e.length)];
        for (var a in e) s = sys.pokeNum(tpoke(e[a]).pokeName), t = sys.type(sys.pokeType1(s)), o = sys.type(sys.pokeType2(s)), i = Math.max(effectiveness(t), effectiveness(o)), send("The effectiveness of " + sys.pokemon(s) + " against the foe's active Pokemon is " + i + "."), i > r && (r = i, n = e[a]);
        return n
    },
    movePower = function(e) {
        if (0 === Object.keys(powerList).length)
            for (var s = sys.getFileContent("db/moves/6G/power.txt").split("\n"), t = 0; t < s.length; t++) {
                var o = s[t].indexOf(" "),
                    i = s[t].substr(0, o),
                    r = s[t].substr(o + 1);
                powerList[i] = r
            }
        return void 0 === powerList[e] || "1" == powerList[e] ? "-" : parseInt(powerList[e])
    },
    isOffensiveBooster = function(e) {
        return -1 != offensiveBoosters.indexOf(sys.move(e))
    };
