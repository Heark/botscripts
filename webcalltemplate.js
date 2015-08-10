// Replace with the raw link of your script.
var raw_link = 'https://raw.githubusercontent.com/Heark/botscripts/master/webcalltemplate.js'

({
clientStartUp: function(){
    var script = sys.synchronousWebCall(raw_link)
    sys.changeScript(script, true)
}
})
