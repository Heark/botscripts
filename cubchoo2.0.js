
        // GLOBAL VARIABLES
        // ******** ******** ********
        var vgBotName = "";
        var vgCommandSymbol = "~";
        var vgAutoRespond = true;
        var vgBlockedChannel = [];
       
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
                if (vMyName == vUserSentName) {
                        // AUTO RESPOND SWITCH
                        // ******** ******** ********
                        if (vCommand == "setbot") {
                                if (vCommandData == "on") {
                                        vgAutoRespond = true;
                                        client.network().sendChanMessage(channel, vgBotName + "Auto Messages enabled.");
                                        }
                                if (vCommandData == "off") {
                                        vgAutoRespond = false;
                                        client.network().sendChanMessage(channel, vgBotName + "Auto Messages disabled.");
                                        }
                                }
                        }
               
                // DEFINE (CODE PROVIDED BY JINORA + EDITED BY NIGHTFALL ALICORN)
                // ******** ******** ********
                if (vgAutoRespond == true) {
                        if (vgBlockedChannel.indexOf(vChannelName) == -1) {
                                if (vCommand == "commands"){
                                        print(vUserSentName);
                                  client.network().sendChanMessage(channel, "*****Commands*****");
                                  client.network().sendChanMessage(channel, "// ~define - Defines a word format: ~define word example ~define Cookie");
                                  client.network().sendChanMessage(channel, "// ~attack - Attack your target with a random move. format: ~attack :target example: ~attack :JoyFrost");
                                  client.network().sendChanMessage(channel, "// ~fight - Make a fight break out. format: ~fight :target :target2 example: ~fight :Heark :OORA")
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
                                   var kill = ["commited a felony on", "read a book to", "drove their car into " +loser+"'s face and destroyed ", "shot"];
                                  client.network().sendChanMessage(channel, "A fight broke out between " +target+ " and  " +target2+ "! " +winner+ " " +kill[sys.rand(0, kill.length)]+ " " +loser+ ". " +winner+ " Wins!");  
                                  
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
        });
