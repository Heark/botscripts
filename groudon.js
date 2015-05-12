// Hearks Cubchoo bot!
// Special Thanks: Nightfall Alicorn, Jinora, Lutra, Coyotte508
// GLOBAL VARIABLES
// ******** ******** ********
// Insults
var insults = [" You swine. You vulgar little maggot. You worthless bag of filth. As we say in Texas, you couldnt pour water out of a boot with instructions printed on the heel. You are a canker, an open wound. I would rather kiss a lawyer than be seen with you. You took your last vacation inthe Isles of Langerhan.", " You're a putrescent mass, a walking vomit. You are a spineless little worm deserving nothing but the profoundest contempt. You are a jerk, a cad, a weasel. Your life is a monument to stupidity. You are a stench, a revulsion, a big suck on a sour lemon.", " You are a bleating foal, a curdled staggering mutant dwarf smeared richly with the effluvia and offal accompanying your alleged birth into a hostile world. You are an insensate, blinking calf, meaningful to nobody, abandoned by the puke-drooling, giggling beasts who sired you and then died of shame in recognition of what they had done. They were a bit late.",
    " I will never get over the embarrassment of belonging to the same species as you. You are a monster, an ogre, a malformity. I barf at the very thought of you. You have all the appeal of a paper cut. Lepers avoid you. You are vile, worthless, less than nothing. You are a weed, a fungus, the dregs of this earth. And did I mention that you smell?",
    " Try to edit your responses of unnecessary material before attempting to impress us with your insight. The evidence that you are a nincompoop will still be available to readers, but they will be able to access it ever so much more rapidly.",
    " You snail-skulled little rabbit. Would that a hawk pick you up, drive its beak into your brain, and upon finding it rancid set you loose to fly briefly before spattering the ocean rocks with the frothy pink shame of your ignoble blood. May you choke on the queasy, convulsing nausea of your own trite, foolish beliefs.",
    " You are weary, stale, flat and unprofitable. You are grimy, squalid, nasty and profane. You are foul and disgusting. You're a fool, an ignoramus. Monkeys look down on you. Even sheep won't have sex with you. You are unreservedly pathetic, starved for attention, and lost in a land that reality forgot. You are not ANSI compliant. You have a couple of address lines shorted together. You should be promoted to Engineering Manager.",
    " And what meaning do you expect your delusionally self-important statements of unknowing, inexperienced opinion to have with us? What fantasy do you hold that you would believe that your tiny-fisted tantrums would have more weight than that of a leprous desert rat, spinning rabidly in a circle, waiting for the bite of the snake?",
    " You are a waste of flesh. You have no rhythm. You are ridiculous and obnoxious. You are the moral equivalent of a leech. You are a living emptiness, a meaningless void. You are sour and senile. You are a loathsome disease, a puerile slack-jawed drooling meatslapper. You make Quakers shout and strike Pentecostals silent. Your mother had to tie a pork chop around your neck just to get your dog to play  with you.  You think P.D.Q. Bach is the greatest composer who ever lived.  You prefer L. Ron Hubbard to Larry Niven and Jerry Pournelle.  Hee-Haw is too deep for you.  You would watch test patterns all day if the other inmates would let you.",
    " On a good day you're a half-wit. You remind me of drool. You are deficient in all that lends character. You have the personality of wallpaper. You are dank and filthy. You are asinine and benighted. You are the source of all unpleasantness. You spread misery and sorrow wherever you go."
];



// Facts
var facts = ["The word Scientist first appeared in 1833", "The average number of readers of any given published scientific paper is said to be 0.6.", "Scientists finally concluded that the chicken came first, not the egg, because the protein which makes egg shells is only produced by hens.",
    "A 10-Year-Old Accidentally Created in 2012 a New Molecule in Science Class: Tetranitratoxycarbon.", "41 new species are discovered by scientists every single day. ", "Sphenopalatine ganglioneuralgia is the scientific term for brain freeze.", "More germs are transferred shaking hands than kissing.", "The human brain takes in 11 million bits of information every second but is aware of only 40.", "A red blood cell can make a complete circuit of your body in 20 seconds.", " Scientists have developed a way of charging mobile phones using urine.",
    "Scientists have developed a microparticle filled with oxygen that can be injected into the blood stream, so we can live without breathing.", "The World's oldest known creature, a mollusc, was 507 years old until scientists killed it by mistake.", "The average person accidentally eats 430 bugs each year of their life.",
    "Males produce one thousand sperm cells each second – 86 million each day.", "Human saliva contains a painkiller called opiorphin that is six times more powerful than morphine.", "Girls have more taste buds than boys.", "Gorillas and potatoes have two more chromosomes than humans do.", "A pig’s orgasm lasts for 30 minutes.", "At over 2000 kilometres long The Great Barrier Reef is the largest living structure on Earth."
,"Scientists can make diamonds from tequila.","Scientists used mouse skin cells to create stem cells, which were then used to create mice eggs that produced healthy baby mice. Those mice were later able to reproduce on their own.", "In 2009, scientists used cloning to bring back an extinct species. It lived for about 7 minutes before dying due to a lung defect.",
"In 1999, scientists attached electrodes to a cat's brain and recorded what it saw.", "Harvard scientists have not only slowed down the aging process in mice, but have even been able to completely reverse it.", "Many scientists believe lobsters do not die of natural causes. Basically, they're immortal.", "Scientists are working on a substance that would give anyone the ability to walk up walls and ceilings à la Spider-Man."
];

var FactTime = 900; // 1 FACT EVERY 900 SECONDS (15 MINUTES)
var hFacts = true; // Disable to turn random facts off
var sysFact = false;

function funFact() {
    sysFact = false;
}

// Rest of code
var Joy = "Heark's friend <3 Oora's sex slave";
var OORA = "Joy's friend <3 Heark's sex slave";
var matches = ["are a match made in heaven!", "were not meant to be.", "both had AIDS.", "'s wedding was destroyed by a gorilla.", "ended up dating eachothers siblings.", "decided to change their sexualities."];
var vgBotName = "++Client Bot: ";
var vgCommandSymbol = "~";
var vgBotMsgPrefix = "";
var vgOfficalChannelArray = ["Blackjack", "Developer's Den", "Evolution Game", "Hangman", "Indigo Plateau", "Mafia", "Mafia Review", "Tohjo Falls", "Tohjo v2", "Tournaments", "TrivReview", "Trivia", "Victory Road", "Watch"];

print(vgBotName + "Script updated.");
print(vgBotName + "Type " + vgCommandSymbol + "help for list of commands for Hot Potato.");

// RESET ALL TIMERS
// ******** ******** ********
sys.unsetAllTimers();

// POTATO GLOBALS
// ******** ******** ********
var vgPotatoPlayerArray = [],
    vgPotatoPlayerUncasedArray = [],
    vgPotatoSignup = false,
    vgPotatoStarted = false,
    vgPotatoCooldown = false,
    vgPotatoVictim,
    vgPotatoChannel,
    vgPotatoSignUpWait = 30, // SECONDS UNTIL SIGNUP IS OVER
    vgPotatoExplodeWaitMin = 15, // MINIMUM SECONDS UNTIL IT CAN POSSIBLY BLOW
    vgPotatoExplodeWaitMax = 60, // MAXIMUM SECONDS TILL IT HAS TO BLOW
    vgPotatoCooldownWait = 1500, // MILLISECONDS FOR HOW LONG TO HOLD THE POTATO OR ELSE IT EXPLODES PASSING TOO SOON
    vgPotatoAuthArray = [client.ownName().toLowerCase()],
    vgPotatoTimerSignUp,
    vgPotatoTimerExplode,
    vgPotatoTimerCooldown;

// POTATO FUNCTIONS
// ******** ******** ********
function funPotatoEnd() {
    "use strict";
    vgPotatoPlayerArray = [];
    vgPotatoPlayerUncasedArray = [];
    vgPotatoSignup = false;
    vgPotatoStarted = false;
    vgPotatoCooldown = false;
    vgPotatoVictim = undefined;
    vgPotatoChannel = undefined;
}

function funPotatoStart(channel, vZero) {
    "use strict";
    if (vgPotatoPlayerArray.length < 2) {
        client.network().sendChanMessage(channel, vgBotMsgPrefix + "Game over! Not enough players have signed up!");
        funPotatoEnd();
    } else {
        var vPlayerRng = Math.floor((Math.random() * vgPotatoPlayerUncasedArray.length) + vZero);
        var vPotatoExplodeLengthRng = Math.floor((Math.random() * vgPotatoExplodeWaitMax) + vgPotatoExplodeWaitMin);
        var vPlayersJoined = vgPotatoPlayerUncasedArray
            .toString()
            .replace(/\,/g, ", ");
        vgPotatoVictim = vgPotatoPlayerUncasedArray[vPlayerRng];
        client.network().sendChanMessage(channel, vgBotMsgPrefix + "Players playing: " + vPlayersJoined);
        client.network().sendChanMessage(channel, vgBotMsgPrefix + vgPotatoPlayerUncasedArray[vPlayerRng] + " is holding the potato! Use " + vgCommandSymbol + "pass <username> to pass the potato!");
        vgPotatoStarted = true;
        vgPotatoTimerExplode = sys.setTimer(function() {
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "The potato exploded on " + vgPotatoVictim + "!");
            client.network().sendChanMessage(channel, "/ck " + vgPotatoVictim);
            funPotatoEnd();
        }, vPotatoExplodeLengthRng * 1000, false);
        vgPotatoCooldown = true;
        vgPotatoTimerCooldown = sys.setTimer(function() {
            vgPotatoCooldown = false;
        }, vgPotatoCooldownWait, false);
    }
    return;
}
var gun = ["AK-47", "Arsenal MG", "Arsenal MG", "6P62", "M14 Rifle", "Stoner 63"];
var vgBotName = "";
var vgCommandSymbol = "~";
var vgAutoRespond = true;
var vgBlockedChannel = [];
var botOnline = true;

// DEFINE CACHED MEMORY
var vgBot_Define_Word;
var vgBot_Define_Data;

print(vgBotName + "Scripts updated.");
print(vgBotName + "Commands:");
print(vgBotName + "// -setbot [off/on]");
print(vgBotName + "// -define [word]:[selection number]");

var poScript;
poScript = ({
afterChallengeReceived: function(cid, b, c, d) {
    client.acceptChallenge(cid);
},
battleFinished: function(battleid, res, winner, loser) {
    // non funziona
    client.removeBattleWindow(battleid);
},
beforeChannelMessage: function(message, channel, html) {
    // VARIABLES
    // ******** ******** ********
    var vMyName = client.ownName();
    var vUserSentName = message.substring(0, message.indexOf(':'));
    var vUserSentMessage = message.substr(message.indexOf(':') + 2).toLowerCase();
    var vChannelName = client.channelName(channel);
    // "use strict";
    // VARIABLES
    // ******** ******** ********
    var x, y, z,
        vMyName = client.ownName(),
        vUserSentName = message.substring(0, message.indexOf(':')),
        vUserSentMessage = message.substr(message.indexOf(':') + 2),
        vUserSentId = client.id(message.substring(0, message.indexOf(':'))),
        vUserSentAuth = client.auth(client.id(message.substring(0, message.indexOf(':')))),
        vUserSentColor = client.color(client.id(message.substring(0, message.indexOf(':')))),
        vChannelName = client.channelName(channel),
        vChannelId = channel,
        vChannelCurrentlyViewingId = client.currentChannel(),
        vChannelCurrentlyViewingName = client.channelName(client.currentChannel()),
        vZero = 0;

    // PREVENT GAME WORKING IN OFFICIAL CHANNELS
    // ******** ******** ********
    if (vgOfficalChannelArray.indexOf(vChannelName) !== -1) {
        return;
    }

    // COMMAND + COMMAND DATA SETUP
    // ******** ******** ********
    var vCommand = "",
        vCommandData = "";
    if (vgCommandSymbol === vUserSentMessage.charAt(0)) {
        //    print("command symbol detected");
        var vSplit = vUserSentMessage.indexOf(" ");
        if (vSplit !== -1) {
            vCommand = vUserSentMessage.substring(1, vSplit).toLowerCase();
            vCommandData = vUserSentMessage.substr(vSplit + 1);
        } else {
            vCommand = vUserSentMessage.substr(1).toLowerCase();
        }
    }

    // START POTATO SIGNUPS
    // ******** ******** ********
    if ((vCommand === "potato") && (vgPotatoSignup === false) && (vgPotatoStarted === false)) {
        vgPotatoChannel = vChannelName;
        client.network().sendChanMessage(channel, vgBotMsgPrefix + "A new game of Hot Potato has started! Type " + vgCommandSymbol + "join to join! Signups will be over in " + vgPotatoSignUpWait + " seconds!");
        client.network().sendChanMessage(channel, vgBotMsgPrefix + "Caution: Do not join if you are unprepared to be kicked from the channel.");
        vgPotatoSignup = true;
        vgPotatoTimerSignUp = sys.setTimer(function() {
            vgPotatoSignup = false;
            funPotatoStart(channel, vZero);
        }, vgPotatoSignUpWait * 1000, false);
    } else if ((vCommand === "potato") && (vgPotatoSignup === true) && (vgPotatoStarted === false)) {
        if (vChannelName !== vgPotatoChannel) {
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "A game is currently in signups in #" + vgPotatoChannel + "!");
        } else {
            client.network().sendChanMessage(channel, "/me A game is currently in signups here! Use " + vgCommandSymbol + "join to join!");
        }
    } else if ((vCommand === "potato") && (vgPotatoSignup === false) && (vgPotatoStarted === true)) {
        if (vChannelName !== vgPotatoChannel) {
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "A game is already playing in #" + vgPotatoChannel + "!");
        } else {
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "A game is already playing here!");
        }
    }

    // JOIN
    // ******** ******** ********
    if ((vCommand === "join") && (vgPotatoSignup === true)) {
        if (vChannelName !== vgPotatoChannel) { // PREVENTS JOINING GAME IN ANOTHER CHANNEL
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "A game of Hot Potato is in signups in #" + vgPotatoChannel + "!");
            return;
        }
        if (vgPotatoPlayerArray.indexOf(vUserSentName.toLowerCase()) !== -1) { // PREVENT DUPLICATE ALTS JOINING
            client.network().sendChanMessage(channel, vgBotMsgPrefix + vUserSentName + " has already joined!");
            return;
        }
        vgPotatoPlayerArray.push(vUserSentName.toLowerCase());
        vgPotatoPlayerUncasedArray.push(vUserSentName);
        // vgPotatoPlayerUncasedArray IS SO ACTUAL NAME CAN BE PRINTED LATER
        client.network().sendChanMessage(channel, vgBotMsgPrefix + vUserSentName + " joined the game!");
        return;
    }

    // UNJOIN
    // ******** ******** ********
    if ((vCommand === "unjoin") && (vgPotatoSignup === true)) {
        if (vChannelName !== vgPotatoChannel) { // PREVENTS UNJOINING GAME IN ANOTHER CHANNEL
            // DO NOTHING
            return;
        }
        if (vgPotatoPlayerArray.indexOf(vUserSentName.toLowerCase()) !== -1) {
            vgPotatoPlayerArray.splice(vgPotatoPlayerArray.indexOf(vUserSentName.toLowerCase), 1);
            vgPotatoPlayerUncasedArray.splice(vgPotatoPlayerUncasedArray.indexOf(vUserSentName), 1);
            client.network().sendChanMessage(channel, vgBotMsgPrefix + vUserSentName + " unjoined the game!");
            return;
        }
        client.network().sendChanMessage(channel, vgBotMsgPrefix + vUserSentName + " isn't in the game!");
        return;
    }

    // PASS
    // ******** ******** ********
    if ((vCommand === "pass") && (vgPotatoStarted === true) && (vUserSentName.toLowerCase() === vgPotatoVictim.toLowerCase())) {
        if (vChannelName !== vgPotatoChannel) { // PREVENTS CHEATING BY PASSING IN ANOTEHR CHANNEL
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "Don't cheat by passing in another channel!");
            return;
        }
        if (vgPotatoPlayerArray.indexOf(vCommandData.toLowerCase()) === -1) { // PREVENT PASSING TO A USER NOT IN THE GAME
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "That user is not in the game!");
            return;
        }
        if (vgPotatoVictim.toLowerCase() === vCommandData.toLowerCase()) { // USER KEEPS HOLD OF THE POTATO
            client.network().sendChanMessage(channel, vgBotMsgPrefix + vUserSentName + " wanted to mysteriously keep hold of the potato for some reason!");
            return;
        }
        if (vgPotatoCooldown === true) { // EXPLODE THE POTATO EARLY, FOR PASSING TOO SOON
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "The potato exploded on " + vgPotatoVictim + " due to passing too soon!");
            client.network().sendChanMessage(channel, "/ck " + vgPotatoVictim);
            if (vgPotatoStarted === true) {
                sys.unsetTimer(vgPotatoTimerExplode);
            }
            sys.unsetTimer(vgPotatoTimerCooldown);
            funPotatoEnd();
            return;
        }
        vgPotatoVictim = vCommandData.toLowerCase();
        client.network().sendChanMessage(channel, vgBotMsgPrefix + vUserSentName + " passed the potato to " + vgPotatoVictim + "!");
        vgPotatoCooldown = true;
        vgPotatoTimerCooldown = sys.setTimer(function() {
            vgPotatoCooldown = false;
        }, vgPotatoCooldownWait, false);
    }

    // END POTATO
    // ******** ******** ********
    if ((vCommand === "endpotato") && (vgPotatoAuthArray.indexOf(vUserSentName.toLowerCase()) !== -1)) {
        if ((vgPotatoSignup === true) || (vgPotatoStarted === true)) {
            client.network().sendChanMessage(channel, vgBotMsgPrefix + "The game of Hot Potato has ended!");
            if (vgPotatoSignup === true) {
                sys.unsetTimer(vgPotatoTimerSignUp);
            }
            if (vgPotatoStarted === true) {
                sys.unsetTimer(vgPotatoTimerExplode);
            }
            if (vgPotatoCooldown === true) {
                sys.unsetTimer(vgPotatoTimerCooldown);
            }
            funPotatoEnd();
            return;
        }
    }

    // HELP POTATO
    // ******** ******** ********
    if (vCommand === "help") {
        var vMessage = vgBotMsgPrefix + "Potato Commands: ";
        var vList = [
            "potato",
            "join",
            "pass [username]",
            "(Bot Auth)",
            "endpotato"
        ];
        for (x = 0; x < vList.length; x++) {
            vMessage = vMessage + vgCommandSymbol + vList[x] + " / ";
        }
        client.network().sendChanMessage(channel, vgBotName + vMessage);
        return;
    }

    // COMMAND + COMMAND DATA SETUP
    // ******** ******** ********
    if (vgCommandSymbol == vUserSentMessage.charAt(0)) {
        //      print("command symbol detected");
        var vCommand, vCommandData;
        var vSplit = vUserSentMessage.indexOf(' ');
        if (vSplit !== -1) {
            vCommand = vUserSentMessage.substring(1, vSplit).toLowerCase();
            vCommandData = vUserSentMessage.substr(vSplit + 1);
        } else {
            vCommand = vUserSentMessage.substr(1).toLowerCase();
        }
    }

    // BOT OWNER COMMANDS
    // ******** ******** ********
    if (vCommand == "on") {
        if (vUserSentName == "Heark" || "Liberal") {
            botOnline = true;
            client.network().sendChanMessage(channel, vgBotName + "Bot enabled.");
        } else {
            client.network().sendChanMessage(channel, vgBotName + "You don't have permission to use this command");
        }
    }
    if (vCommand == "off") {
        if (vUserSentName == "Heark" || "Liberal") {
            botOnline = false;
            client.network().sendChanMessage(channel, vgBotName + "Bot disabled.");
        } else {
            client.network().sendChanMessage(channel, vgBotName + "You don't have permission to use this command");
        }
    }
    if (vCommand == "namebot") {
        if (vUserSentName == "Heark" || "Liberal" || "Bill Nye") {
            var vData = vCommandData.split(":", 2);
            var name = vData[0];
            client.changeName(name);
            client.network().sendChanMessage(channel, vUserSentName + " changed the bot's name to " + name + "!");
        }
    }
    if (vCommand == "boteval") {
        if (vUserSentName == "Heark" || "Liberal" || "Bill Nye") {
            var vData = vCommandData.split(":", 2);
            var script = vData[0];
            var code = sys.eval(script);
            client.network().sendChanMessage(channel, code + "");
        }
    }

    if (vCommand == "makedir") {
        if (vUserSentName === "Heark" || "Liberal" || "Bill Nye") {
            var vData = vCommandData.split(":", 2);
            var dir = vData[0];
            sys.makeDir(dir);
            client.network().sendChanMessage(channel, "Directory named " + dir + " successfully created!");
        }
    }


    if (botOnline == true) {

        // DEFINE (CODE PROVIDED BY JINORA + EDITED BY NIGHTFALL ALICORN)
        // ******** ******** ********
        if (vgAutoRespond == true) {
            if (vgBlockedChannel.indexOf(vChannelName) == -1) {
                if (vCommand == "commands") {
                    print(vUserSentName);
                    client.network().sendChanMessage(channel, "Commands: (~) Prefix | define, catch, attack, potato, fight, insult, shoot, stats, match. ");
                }
                if (vCommand == "catch") {
                    client.network().sendChanMessage(channel, vUserSentName + " Caught a " + sys.pokemon(sys.rand(1, 719)) + " At Level " + sys.rand(1, 100) + " with a " + sys.nature(sys.rand(1, 25)) + " nature!");
                }
                if (vCommand == "randfact") {
                   client.network().sendChanMessage(channel, "Random Fact: Did you know " + facts[sys.rand(0, facts.length)] + "")
                }
                if (vCommand == "attack") {
                    var vData = vCommandData.split(":", 2);
                    var vTarget = vData[0];
                    var hp = sys.rand(1, 100);
                    print(vUserSentName);
                    client.network().sendChanMessage(channel, vUserSentName + " used " + sys.move(sys.rand(0, 559)) + " & " + sys.move(sys.rand(0, 559)) + " on " + vTarget + " it took down " + hp + "% hp!");
                }
                if (vCommand == "insult") {
                    var vData = vCommandData.split(":", 2);
                    var name = vData[0];
                    client.network().sendChanMessage(channel, name + "" + insults[sys.rand(0, insults.length)] + "");
                }

                /*                     if (hFacts == true) {
                                            factTimer = sys.setTimer(function () {
                                                client.network().sendChanMessage(channel, "Random Fact: Did you know " + facts[sys.rand(0, facts.length)] + "")
                                                sysFact = true
                                                funFact();
                                                }, 6000, false)
                                        }
                */
                if (sysFact == true) {
                    sys.unsetTimer(factTimer);
                }

                if (vCommand == "shoot") {
                    var vData = vCommandData.split(":", 2);
                    var vTarget = vData[0];
                    var vDefineSelection = vData[1];
                    client.network().sendChanMessage(channel, "/me ** " + vUserSentName + " shot " + vTarget + " with a " + gun[sys.rand(0, gun.length)])
                }
                if (vCommand == "match") {
                    var vData = vCommandData.split(":", 2);
                    var vTarget = vData[0];
                    var vTarget2 = vData[1];
                    client.network().sendChanMessage(channel, "/me ** " + vTarget + " & " + vTarget2 + " " + matches[sys.rand(0, matches.length)])
                }

                if (vCommand == "battle") {
                    var num2 = Math.floor((Math.random() * 10) + 1);
                    var pokemon1 = sys.pokemon(sys.rand(1, 719))
                    var pokemon2 = sys.pokemon(sys.rand(1, 719))

                    if (num2 < 5) {
                        var winner = pokemon1
                        var loser = pokemon2
                    } else if (num2 > 5) {
                        var winner = pokemon2;
                        var loser = pokemon1;

                    }
                    client.network().sendChanMessage(channel, "/me ** A battle started between " + pokemon1 + " and  " + pokemon2 + " | " + winner + " used " + sys.move(sys.rand(0, 559)));
                    client.network().sendChanMessage(channel, "/me " + winner + " wins!  " + loser + " fainted.");

                }

            }

            if (vCommand == "userinfo") {
                if (vUserSentName == "Heark" || "Liberal") {
                    var vData = vCommandData.split(":", 2);
                    var vTarget = vData[0];
                    var info = getUserInfo(vTarget)
                    print(info)

                } else {
                    client.network().sendChanMessage(channel, vgBotName + "You don't have permission to use this command");
                }
            }
           
            if (vCommand == "stats") {
                    var vDat2 = vCommandData.split(":", 2);
                    var chosenPokemon = vData2[0];
                    var chosen = sys.pokeNum(chosenPokemon)
                }
                var type1 = sys.pokeType1(chosen, 6)
                var type2 = sys.pokeType2(chosen, 6)
                var ab1 = sys.pokeAbility(chosen, 0)
                var ab2 = sys.pokeAbility(chosen, 1)
                var ab3 = sys.pokeAbility(chosen, 2)
                if (chosen == undefined) {
                    client.network().sendChanMessage(channel, chosenPokemon + " doesn't exist in the database.");
                } else {
                    client.network().sendChanMessage(channel, chosenPokemon + "'s stats: Type: " + sys.type(type1) + " " + sys.type(type2) + "| Abilities: " +ab1+""+ab2+""+ab3+ " | HP: " + sys.baseStats(chosen, 0, 6) + " | ATK: " + sys.baseStats(chosen, 1, 6) + " | DEF: " + sys.baseStats(chosen, 2, 6) + " | SPA: " + sys.baseStats(chosen, 3, 6) + " | SPD: " + sys.baseStats(chosen, 4, 6) + " | SPEED: " + sys.baseStats(chosen, 5, 6) + ".");
                }
                
            if (vCommand == "savelogs") {
                client.printHtml("<b><font color =red>Now saving logs...</font></b>")
                sys.makeDir(botlogs);
            }
        }
        if (vCommand == "botreboot") {
            if (vUserSentName == "Heark") {
                client.reconnect();
                sys.stopEvent();
                return;
            }
        }
        if (vCommand == "fight") {
            if (vCommandData.indexOf(":") !== -1) {
                var vData2 = vCommandData.split(":", 2);
                var tar = vCommandData.split(":", 3);
                var target = vData2[1];
                var target2 = tar[2];
                var posswin = [];
            }
            print(vUserSentName);
            var num = Math.floor((Math.random() * 10) + 1);
            if (num > 5) {
                var winner = target;
                var loser = target2;
            } else if (num < 5) {
                var winner = target2;
                var loser = target;
            }
            var kill = ["commited a felony on " + loser + "", "read a book to " + loser + "", "drove their car into " + loser + "'s face.", "shot" + loser + "", "gave an overdose of viagra to " + loser + "", "" + loser + " was forced to have anal intercourse with a stallion by " + winner + ".", "forced a toothpick down" + loser + "'s throat"];
            client.network().sendChanMessage(channel, "A fight broke out between " + target + " and  " + target2 + "! " + winner + " " + kill[sys.rand(0, kill.length)] + ". " + winner + " Wins!");

        }
        if (vCommand == "define") {
            print(vUserSentName);
            // CHECK FOR SECONDARY COMMAND DATA
            if (vCommandData.indexOf(":") !== -1) {
                // SPLIT
                var vData = vCommandData.split(":", 2);
                var vDefineWord = vData[0];
                var vDefineSelection = vData[1];

                // MAKE SURE vDefineSelection IS AN INTEGER AND FLOOR
                vDefineSelection = Math.floor(parseInt(vDefineSelection));
                if (vDefineSelection == parseInt(vDefineSelection)) {
                    // DO NOTHING
                } else {
                    vDefineSelection = 0;
                }
            } else {
                var vDefineWord = vCommandData;
                var vDefineSelection = 0;
            }

            var vDefStatus = "";
            // IF WORD IS STORED IN CACHED READ CURRENTLY DOWNLOAD ONE
            if (vgBot_Define_Word == vDefineWord) {
                vDefData = vgBot_Define_Data;
                vDefStatus = "(Cached)";
            }
            // IF WORD NOT CURRENTLY STORED IN CACHED DOWNLOAD IT
            if (vgBot_Define_Word != vDefineWord) {
                // GET RESULT FROM URBAN DICTIONARY AND STORE DATA
                var vResponse = sys.synchronousWebCall("http://api.urbandictionary.com/v0/define?term=" + (encodeURIComponent(vDefineWord)));
                var vDefData = JSON.parse(vResponse);
                vgBot_Define_Word = vDefineWord;
                vgBot_Define_Data = vDefData;
                vDefStatus = "(Uploading...)";
            }

            // CHECK IF DEFINITION DOESNT EXIST
            if (vDefData.result_type != "exact") {
                client.network().sendChanMessage(channel, vgBotName + "\"" + vDefineWord.toLowerCase() + "\"" + " is not defined!")
            }
            // IF IT DOES EXIST
            else {
                // BUILD AND COUNT DEFINITIONS AVAILABLE
                var vDefString = [];
                var vDefLength = -1;
                var vCheck = true;
                for (x = 0; vCheck == true; x++) {
                    try {
                        vDefString[x] = vDefData.list[x].definition;
                        vDefLength++;
                    } catch (err) {
                        vCheck = false;
                    }
                }

                // DEFINE SELECTION RANGE CHECK
                if (vDefineSelection > vDefLength) {
                    vDefineSelection = vDefLength;
                }
                if (vDefineSelection < 0) {
                    vDefineSelection = 0;
                }

                // OBTAIN STRING TO ALLOW LENGTH CHECK
                var vStringLimit = 4900; // String Limit is 4900
                var vStringToPrint = vDefString[vDefineSelection];

                // MESSAGE FORMAT
                var vDefMessageWord = "\"" + vDefineWord.toLowerCase() + "\"";
                var vDefMessageInfo = vStringToPrint;
                var vDefMessageSelection = "(" + vDefineSelection + "/" + vDefLength + ")"
                var vDefMessageLimitReached = "[String Limit of " + vStringLimit + " Reached]";

                // BANNED WORDS
                var vDefBanned = [];

                // CHECK BANNED WORD
                if (vDefBanned.indexOf(vDefineWord) == -1) {
                    // STRING LIMIT CHECK
                    if (vStringToPrint.length <= vStringLimit) {
                        client.network().sendChanMessage(channel, vgBotName + " " + vDefStatus + " " + vDefMessageWord + " " + vDefMessageSelection + ": " + vDefMessageInfo);
                    }
                    if (vStringToPrint.length > vStringLimit) {
                        client.network().sendChanMessage(channel, vgBotName + " " + vDefStatus + " " + vDefMessageWord + " " + vDefMessageSelection + ": " + vDefMessageInfo.substring(0, vStringLimit) + " " + vDefMessageLimitReached);
                    }
                } else {
                    client.network().sendChanMessage(channel, vgBotName + "The define for this word is banned.");
                }
            }
        }
    }
}
})
/*
Hot Potato Game Client Script v1.01
Edited by Nightfall Alicorn
Remade by <anonymous>
Original script idea by Cirno

- Introduction -
    This is a fun game script that is basically pass the bomb.
    
    The game sets a random range timer 15 to 60 seconds by default. The
    player, who is currently holding the potato, has to pass it to another
    player in the channel that is in the game. Eventually someone will get
    /ck when the bomb explodes on them.
    
    Of course. People can't cheat with bots by instant passing to another user
    since the bomb will go off instantly.
    
    Commands:
    ******** ******** ********
    -potato / Starts the game's sign up process.
    -join / To join the game.
    -unjoin / Leave the game during sign ups.
    -pass [user] / Pass the potato to that user.
    -help / Display list of commands.
    
    Bot Auth Commands:
    ******** ******** ********
    -endpotato

- Installing -
    1. Copy all this text.
    2. On Pokemon Online, go to "Plugins" and "Plugin Manager".
    3. Check the check box for "Script Window" and click "OK".
    4. Go to "Plugins" again and this time "Script Window".
    5. Paste the code in the "Client scripts" text window.
    6. To avoid problems, uncheck "Safe Scripts" and check "Show Warnings".
    7. Finally, click "OK".
    
    If you are already logged on the server. You should see the message:
    (00:00:00) ++Client Bot: Script updated.
    (00:00:00) ++Client Bot: Type -help for list of commands for Hot Potato.

- Notes -
    For safety reasons, the Hot Potato Game bot won't work in official channels
    by default.
*/

// JSLINT GLOBAL PRE-DEFINE
/*global client, print, sys*/

// GLOBAL VARIABLES
// ******** ******** ********

// END OF objPoScript
