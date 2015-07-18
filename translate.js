 if (vCommand == "translate") {
                    	var vData2 = vCommandData.split(":", 2);
                        var tWord = vData2[0];
                        var tLang = vData2[1];
                        if(tLang == undefined){
                        	client.network().sendChanMessage(channel, "Please define a language first. Use ~langs to see the supported languages")
                        } else if(tLang.toLowerCase() == "spanish"){
                        	tLang = "spa"
                        }
                        
                           var loadtWord = sys.synchronousWebCall("https://glosbe.com/gapi/translate?from=eng&dest="+(encodeURIComponent(tLang))+"&format=json&phrase="+(encodeURIComponent(tWord))+"&pretty=false")
                           var translated = JSON.parse(loadtWord)
                           if(translated.text == undefined ){
                           	client.network().sendChanMessage(channel, "Failed to load data for "+tWord)
                           } else {
                           	client.network().sendChanMessage(channel, translated.text)
                           }

                    }
                
