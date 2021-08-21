chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message,sender,sendresponse)
{

}

const storage_name = "my_wa_storage"

const openChat = (phone,wa_message) => {
    const link = document.createElement("a");
    link.setAttribute("href", `whatsapp://send?phone=${phone}`);
    document.body.append(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
        var inputMessageBox = document.querySelectorAll("[contenteditable='true']")[1]; 
        var message = wa_message ;
        var uiEvent = document.createEvent("UIEvents");     
        inputMessageBox.innerHTML = message; 
        uiEvent.initUIEvent("input", true, true, window, 1); 
        inputMessageBox.dispatchEvent(uiEvent); 
        var mouseEvent = document.createEvent("MouseEvents"); 
        mouseEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
        document.querySelector('span[data-icon="send"]').dispatchEvent(mouseEvent); 
    },500)
  };
  
    try{
        if(send_wa){
                send_wa.addEventListener("click",() => {
                    let phones = document.getElementById("phones").value
                    let wa_message = document.getElementById("wa_message").value
                    chrome.storage.local.set({wa_phones: phones,wa_message:wa_message}, function() {
                        console.log('Value is set to ' + phones);
                        window.open("https://web.whatsapp.com/")
                    });      
                })
        }
    }catch(e){
        // console.error(e)
    }

window.onload = () => {
    
if( location.hostname == "web.whatsapp.com")
{
    setTimeout( () => {

        chrome.storage.local.get(['wa_phones','wa_message'], function(result) {
            let phones = JSON.parse(result.wa_phones)
            let i = 0;
            setInterval(() => {
                    try{
                            if(i < phones.length){
                                    openChat(phones[i],result.wa_message)
                                    i++
                                }
                                }catch(e){}
                        },2000)
                });
        },3000)
    }

}

chrome.storage.local.get(['key'], function(result) {

    console.log(result);
    let value = "test"
    
 });
