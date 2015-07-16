// I'll finish it tommorow ;-;


var bgplus = ["Heark", "OORA", "JoyFrost"];
var emote = function(){
    this.id = id; 
    this.name = name;
    this.code = code;
    }
function canUseEmotes(nameid){
    if(bgplus.indexOf(nameid) !== -1){
    return true
    } else {
    return false
    }
}
em1 = new emote(01,":)","pokemon:1");
em2 = new emote(02, ":(", "pokemon:2");
em3 = new emote(03, "._.", "pokemon:3");
var emotes = [em1, em2]
//Have to look  at the the server scripts to find the player input variable.



if (canUseEmotes(player_name)){
    if(message.indexOf(emotes.name) > -1){
    
    }
    
}
