// Hearks Cubchoo bot!
// Special Thanks: Nightfall Alicorn, Jinora, Lutra, Coyotte508
        // GLOBAL VARIABLES
        // ******** ******** ********
    // Insults
    var insults = [" You swine. You vulgar little maggot. You worthless bag of filth. As we say in Texas, you couldnt pour water out of a boot with instructions printed on the heel. You are a canker, an open wound. I would rather kiss a lawyer than be seen with you. You took your last vacation inthe Isles of Langerhan.", " You're a putrescent mass, a walking vomit. You are a spineless little worm deserving nothing but the profoundest contempt. You are a jerk, a cad, a weasel. Your life is a monument to stupidity. You are a stench, a revulsion, a big suck on a sour lemon."
    ," You are a bleating foal, a curdled staggering mutant dwarf smeared richly with the effluvia and offal accompanying your alleged birth into a hostile world. You are an insensate, blinking calf, meaningful to nobody, abandoned by the puke-drooling, giggling beasts who sired you and then died of shame in recognition of what they had done. They were a bit late.",
    " I will never get over the embarrassment of belonging to the same species as you. You are a monster, an ogre, a malformity. I barf at the very thought of you. You have all the appeal of a paper cut. Lepers avoid you. You are vile, worthless, less than nothing. You are a weed, a fungus, the dregs of this earth. And did I mention that you smell?", 
    " Try to edit your responses of unnecessary material before attempting to impress us with your insight. The evidence that you are a nincompoop will still be available to readers, but they will be able to access it ever so much more rapidly.", 
    " You snail-skulled little rabbit. Would that a hawk pick you up, drive its beak into your brain, and upon finding it rancid set you loose to fly briefly before spattering the ocean rocks with the frothy pink shame of your ignoble blood. May you choke on the queasy, convulsing nausea of your own trite, foolish beliefs.",
    " You are weary, stale, flat and unprofitable. You are grimy, squalid, nasty and profane. You are foul and disgusting. You're a fool, an ignoramus. Monkeys look down on you. Even sheep won't have sex with you. You are unreservedly pathetic, starved for attention, and lost in a land that reality forgot. You are not ANSI compliant. You have a couple of address lines shorted together. You should be promoted to Engineering Manager."]
        var gun = ["AK-47", "Arsenal MG", "Arsenal MG", "6P62", "M14 Rifle", "Stoner 63"]
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
afterChallengeReceived: function(cid, b, c, d){
    client.acceptChallenge(cid);
},
battleFinished: function(battleid, res, winner, loser){
    // non funziona
	client.removeBattleWindow(battleid);
},
    beforeChannelMessage: function (message, channel, html) {
                // VARIABLES
                // ******** ******** ********
                var vMyName     = client.ownName();
                var vUserSentName = message.substring(0, message.indexOf(':'));
                var vUserSentMessage = message.substr(message.indexOf(':') + 2).toLowerCase();
                var vChannelName = client.channelName(channel);
               
                // COMMAND + COMMAND DATA SETUP
                // ******** ******** ********
                if (vgCommandSymbol == vUserSentMessage.charAt(0)) {
                //      print("command symbol detected");
                        var vCommand, vCommandData;
            var vSplit = vUserSentMessage.indexOf(' ');
            if (vSplit !== -1) {
                vCommand = vUserSentMessage.substring(1, vSplit).toLowerCase();
                vCommandData = vUserSentMessage.substr(vSplit + 1);
                                }
            else {
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

 if (botOnline == true){
 	
                // DEFINE (CODE PROVIDED BY JINORA + EDITED BY NIGHTFALL ALICORN)
                // ******** ******** ********
                if (vgAutoRespond == true) {
                        if (vgBlockedChannel.indexOf(vChannelName) == -1) {
                                if (vCommand == "commands"){
                                        print(vUserSentName);
                                  client.network().sendChanMessage(channel, "/me // ~define - Defines a word format: ~define word example ~define Cookie");
                                  client.network().sendChanMessage(channel, "/me // ~attack - Attack your target with a random move. format: ~attack :target example: ~attack :JoyFrost");
                                  client.network().sendChanMessage(channel, "/me // ~fight - Make a fight break out. format: ~fight :target :target2 example: ~fight :Heark :OORA")
                                  client.network().sendChanMessage(channel, "/me // ~catch - Catch a random pokemon");
                                  client.network().sendChanMessage(channel, "/me // ~stats - View the stats of a pokemon. format: ~stats :target example: ~stats :pikachu")
                                }
                                if (vCommand == "catch"){
                                	client.network().sendChanMessage(channel, vUserSentName +" Caught a "+ sys.pokemon(sys.rand(1, 719)) + " At Level " + sys.rand(1, 100) +" with a " + sys.nature(sys.rand(1, 25)) + " nature!")
                                }
                                if (vCommand == "attack"){
                                  if (vCommandData.indexOf(":") !== -1) {
                                                var vData2 = vCommandData.split(":",2);
                                                var target = vData2[1];
                                                var pt2  = vData2[0];
                                  }
                                  print(vUserSentName);
                                  client.network().sendChanMessage(channel, vUserSentName +" used " + sys.move(sys.rand(0, 559)) +  " on " +target+ "")                
                                }
                                if (vCommand == "insult"){
                                	        var vData = vCommandData.split(":",2);
                                                var name                 = vData[0];
                                                client.network().sendChanMessage(channel,  name+ ""+insults[sys.rand(0, insults.length)]+"")
                                }
                                                
                                	
                        
                                if (vCommand == "shoot"){
                                	        var vData = vCommandData.split(":",2);
                                                var vTarget                 = vData[0];
                                                var vDefineSelection    = vData[1];
                                        client.network().sendChanMessage(channel, "/me ** " + vUserSentName +" shot " +vTarget+ " with a "+gun[sys.rand(0, gun.length)])
                                        }
                                        
                                
                                         if (vCommand == "battle"){
                                                 var num2 = Math.floor((Math.random() * 10) + 1); 
                                                 	var pokemon1 = sys.pokemon(sys.rand(1, 719))
                                                 	var pokemon2 = sys.pokemon(sys.rand(1, 719))
                                                 
                                                 if (num2 < 5){
                                                 var winner = pokemon1
                                                 var loser = pokemon2
                                                 } else if (num2 > 5){
                                                 var winner = pokemon2
                                                 var loser = pokemon1
                                                 	
                                                 }
                                        client.network().sendChanMessage(channel, "/me ** A battle started between " +pokemon1+ " and  "+pokemon2+ " | "+winner+" used "+ sys.move(sys.rand(0, 559)))
                                        client.network().sendChanMessage(channel, "/me " +winner+ " wins!  " +loser+ " fainted.")
                                        
                                        }
                        
                        }
                                        
                                
                                 if (vCommand == "userinfo"){
                                 if (vUserSentName == "Heark" || "Liberal") {
                                var vData = vCommandData.split(":",2);
                                var vTarget                 = vData[0];
                                var info =	getUserInfo(vTarget)
                                print(info)
                                 
                                } else {
                                	client.network().sendChanMessage(channel, vgBotName + "You don't have permission to use this command");
                                } 
                                }
                                if (vCommand == "stats"){
                                	        if (vCommandData.indexOf(":") !== -1) {
                                                var vData2 = vCommandData.split(":",2);
                                                var chosenPokemon = vData2[1];
                                                var chosen = sys.pokeNum(chosenPokemon)
                                }		var type1 =  sys.pokeType1(chosen, 6)
                                		var type2 = sys.pokeType2(chosen, 6)
                                if (chosen == undefined){
                                	client.network().sendChanMessage(channel, chosenPokemon+" doesn't exist in the database.");
                                } else {	
                                client.network().sendChanMessage(channel, chosenPokemon+"'s stats: Type: " +sys.type(type1)+ " " +sys.type(type2)+ " | HP: " +sys.baseStats(chosen, 0, 6)+ " | ATK: " +sys.baseStats(chosen, 1, 6)+ " | DEF: "+sys.baseStats(chosen, 2, 6)+ " | SPA: " +sys.baseStats(chosen, 3, 6)+ " | SPD: " +sys.baseStats(chosen, 4, 6)+ " | SPEED: "+sys.baseStats(chosen, 5, 6)+".");	
                                }
                                if (vCommand == "savelogs"){
                                	client.printHtml("<b><font color =red>Now saving logs...</font></b>")
                                	sys.makeDir(botlogs);
                                }
                                }
                                if (vCommand == "botreboot"){
                                	if (vUserSentName == "Heark"){
                                    client.reconnect();
                                      sys.stopEvent();
                                          return;
                                	}
                                }
                                  if (vCommand == "fight"){
                                  if (vCommandData.indexOf(":") !== -1) {
                                                var vData2 = vCommandData.split(":",2);
                                                var tar = vCommandData.split(":",3);
                                                var target = vData2[1];
                                                var target2  = tar[2];
                                                var posswin = [];
                                  }
                                  print(vUserSentName);
                                  var num = Math.floor((Math.random() * 10) + 1);
                                  if (num > 5){
                                  var winner = target;
                                  var loser = target2;
                                  } else if (num < 5){
                                          var winner = target2;
                                          var loser = target;
                                  }
                                   var kill = ["commited a felony on "+loser+"", "read a book to "+loser+"", "drove their car into " +loser+"'s face.", "shot"+loser+"", "gave an overdose of viagra to "+loser+"", ""+loser+" was forced to have anal intercourse with a stallion by " +winner+".", "forced a toothpick down"+loser+"'s throat"];
                                  client.network().sendChanMessage(channel, "A fight broke out between " +target+ " and  " +target2+ "! " +winner+ " " +kill[sys.rand(0, kill.length)]+ ". " +winner+ " Wins!");  
                                  
                                }
                                if (vCommand == "define") {
                                        print(vUserSentName);
                                        // CHECK FOR SECONDARY COMMAND DATA
                                        if (vCommandData.indexOf(":") !== -1) {
                                                // SPLIT
                                                var vData = vCommandData.split(":",2);
                                                var vDefineWord                 = vData[0];
                                                var vDefineSelection    = vData[1];
                                               
                                                // MAKE SURE vDefineSelection IS AN INTEGER AND FLOOR
                                                vDefineSelection = Math.floor(parseInt(vDefineSelection));
                                                if (vDefineSelection == parseInt(vDefineSelection)) {
                                                        // DO NOTHING
                                                        }
                                                else {
                                                        vDefineSelection = 0;
                                                        }
                                                }
                                        else {
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
                                                for (x=0; vCheck==true; x++){
                                                        try {
                                                                vDefString[x] = vDefData.list[x].definition;
                                                                vDefLength++;
                                                                }
                                                        catch (err) {
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
                                                var vStringLimit = 4900;        // String Limit is 4900
                                                var vStringToPrint = vDefString[vDefineSelection];
                                               
                                                // MESSAGE FORMAT
                                                var vDefMessageWord             = "\"" + vDefineWord.toLowerCase() + "\"";
                                                var vDefMessageInfo                     = vStringToPrint;
                                                var vDefMessageSelection        = "(" + vDefineSelection + "/" + vDefLength + ")"
                                                var vDefMessageLimitReached     = "[String Limit of " + vStringLimit + " Reached]";
                                               
                                                // BANNED WORDS
                                                var vDefBanned = [
                                                        ];
                                                       
                                                // CHECK BANNED WORD
                                                if (vDefBanned.indexOf(vDefineWord) == -1) {
                                                        // STRING LIMIT CHECK
                                                        if (vStringToPrint.length <= vStringLimit) {
                                                                client.network().sendChanMessage(channel, vgBotName + " " + vDefStatus + " " + vDefMessageWord + " " + vDefMessageSelection + ": " + vDefMessageInfo);
                                                                }
                                                        if (vStringToPrint.length > vStringLimit) {
                                                                client.network().sendChanMessage(channel, vgBotName + " " + vDefStatus + " " + vDefMessageWord + " " + vDefMessageSelection + ": " + vDefMessageInfo.substring(0, vStringLimit) + " " + vDefMessageLimitReached);
                                                                }
                                                        }
                                                else {
                                                        client.network().sendChanMessage(channel, vgBotName + "The define for this word is banned.");
                                                        }
                                                }
                                        }
                                }
                        }
                       
                }
})
