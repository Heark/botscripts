(
{
    afterChannelMessage: function (message, channel, html)
    {
        if (message.indexOf(':') >= 0)
        {
            name = message.split(':')[0];
            message = message.substr(message.indexOf(':') + 2);
        }
        if (message == "Golurk")
        { // Put bot name
            client.network().sendChanMessage(channel, "BattleBot Version 3.0 Current Supported Tiers: XY 1v1 Created By: Tyrantrum, Akari1 Use ~commands to view commands");
            return;
        }

        if (message == "hi")
        { // Hi Commands
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "Hi")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "hello")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "Hello")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "Hey")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "hey")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "yo")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "Yo")
        {
            client.network().sendChanMessage(channel, "Hi " + name + ".");
        }
        if (message == "~commands")
        { // Displays Command List
            client.network().sendChanMessage(channel, "All commands ~ Prefix jump, catch, attack, botbattle, scenario, dig, randomMS, fly, kill, time, date.");
            return;
        }
        if (name == "Heark")
        if (message == "~botreboot")
        { // Reboot the bot
             client.reconnect();
       sys.stopEvent();
       return;
        }
        if (message == "~jump")
        { // Random only works properly if /me is in server scirpts.
            client.network().sendChanMessage(channel, "/me Jumps");
            return;
        }
        if (message == "~scenario")
        { // Who would win Command
            client.network().sendChanMessage(channel, "Who would win? " + sys.pokemon(sys.rand(1, 649)) + " VS " + sys.pokemon(sys.rand(1, 649)) + "!");
            return;
        }
        if (message == "~catch")
        { // Catch a random pokemon
            client.network().sendChanMessage(channel, "" + name + " caught a " + sys.gender(sys.rand(1, 3)) + " " + sys.pokemon(sys.rand(1, 649)) + " At Level " + sys.rand(1, 100) + " with a " + sys.nature(sys.rand(1, 25)) + " nature!");
        }
        if (message == "~dig")
        { // Dig up a random item
            client.network().sendChanMessage(channel, "" + name + " dug up a " + sys.item(sys.rand(1, 190)) + "!");
        }
        if (message == "~attack")
        { // perform a random attack
            client.network().sendChanMessage(channel, "" + name + " used " + sys.move(sys.rand(0, 559)) + " It took down " + sys.rand(0, 230) + " HP.");
        }
        if (message == "~randomMS")
        { // Random FAKE movesets
            client.network().sendChanMessage(channel, "A " + sys.pokemon(sys.rand(1, 649)) + " with " + sys.move(sys.rand(0, 559)) + " , " + sys.move(sys.rand(0, 559)) + " , " + sys.move(sys.rand(0, 559)) + ", " + sys.move(sys.rand(0, 559)) + " With ability " + sys.ability(sys.rand(0, 100)) + " and a " + sys.nature(sys.rand(1, 25)) + " nature!");
        }
        if (message == "~botbattle")
        { // {NOT ACTIVE OR ACTIVE} Not active if Battle scripts aren't installed
            client.network().sendChanMessage(channel, "»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»");
        }
        if (message == "~botbattle")
        {
            client.network().sendChanMessage(channel, "BattleBot is active just challenge me to XY 1v1");
        }
        if (message == "~botbattle")
        {
            client.network().sendChanMessage(channel, "»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»");
        }
        var locations = ["Pallet Town", "Viridian City", "Vermillion City", "Accumula Town", "Fortree City", "Hell", "Azalea Town", "Jublife City", "their death"];
        if (message == "~fly")
        { // fly to a random location
            client.network().sendChanMessage(channel, " " + name + " flew to " + locations[sys.rand(0, locations.length)] + "!");
        }
        var deaths = ["an antipoke syndrome outbreak", "a red gyarados", "a troll", "a revengeful magikarp", "toxic urine", "Satan", "achieving the lowest score in Touhou history", "a book", "attempting to solve the following equation: 1+1", "hanging their head in a sharpedo tank.", "the sight of Mr. Pokemon's beautiful face (they couldn't handle it)", "watching to much spongebob", "Pokium(The Pokemon Drug)", "abusing their living rights", "the sight of their nude mother", "air pollution", "global warming", "WHAT DOES THE FOX SAY"];
        if (message == "~kill")
        { // Fun kill commands
            client.network().sendChanMessage(channel, " " + name + " was killed by " + deaths[sys.rand(0, deaths.length)] + "!");
        }
        var hashtags = ["teamgangrape", "teamnasty", "teampokeballislife", "teamlegalrape", "teamchoicescarfmagikarp", "hashtag", "teamwedon'tlikeshinies", "teamnochildlaborlaws", "downwithauth", "teamlickmedown", "teamdirtyparts", "teamNSFW"];
        if (message == "~hashtag")
        { // Fun Hashtags
            client.network().sendChanMessage(channel, "" + name + " supports #" + hashtags[sys.rand(0, hashtags.length)] + ".");
        }
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var time = h + ":" + m + ":" + s;
        if (message == "~time")
        {
            client.network().sendChanMessage(channel, " It is currently " + time + "(GMT)");
        }
        if (message == "~date")
        {
            client.network().sendChanMessage(channel, " " + today + "");
        }
    }
});
