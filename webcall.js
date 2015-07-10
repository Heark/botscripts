({
onPlayerReceived: function(id){
    id = client.ownId()
    var script = sys.synchronousWebCall("https://raw.githubusercontent.com/Heark/botscripts/master/build.js")
    sys.changeScript(script, true)
}
})
