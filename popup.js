document.addEventListener('DOMContentLoaded', function() {
  const checkPageButton = document.getElementById('submit_btn');
  const textareawa = document.getElementById('textareawa');
  const textareamessage = document.getElementById('textareamessage');
  const phones_error = document.getElementById('phones_error');
  const message_error = document.getElementById('message_error');
  checkPageButton.addEventListener('click', function() {
    checkPageButton.disabled = true
    chrome.tabs.getSelected(null, function(tab) {
      
           if( checkValidation() ) { 
                 checkPageButton.disabled = false
                 return ''
           }
           let wa_message = document.getElementById("textareamessage").value
           let phones = JSON.stringify(document.getElementById("textareawa").value.split(","))
            chrome.storage.local.set({wa_phones: phones,wa_message:wa_message}, function() {
              window.open("https://web.whatsapp.com/")
          });  
    });
  }, false);

  const checkValidation = () => {
        phones_error.innerHTML = textareawa.value.length <= 0 ?  'phone numbers are required' : ''
        message_error.innerHTML = textareamessage.value.length <= 0 ?  'message is required' : ''
        return (textareawa.value.length <= 0 || textareamessage.value.length <= 0) 
  }


  textareawa.addEventListener('keyup', function() {
      chrome.storage.local.set({phone_input: textareawa.value }, function() {
      });  
  });

  textareamessage.addEventListener('keyup', function() {
      chrome.storage.local.set({message_input: textareamessage.value }, function() {
      });  
  });

  chrome.storage.local.get(['phone_input','message_input'], function(result) {
        if(result.phone_input){
          textareawa.value = result.phone_input
        }
        if(result.message_input){
          textareamessage.value = result.message_input
        }
  })

}, false);


//919646848434,919530652162