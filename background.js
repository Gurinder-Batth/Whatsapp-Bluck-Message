console.log("Background running");
chrome.browserAction.onClicked.addListener(IconClicked);
function IconClicked(tab)
{
	let msg = {
		txt : "Hello"
	}
	chrome.tabs.sendMessage(tab.id,msg);
}
