var last;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(tab);
    if (tab.status == "complete" && tab.url.startsWith("https://namu.wiki")) {
        console.log("injecting");
        chrome.tabs.executeScript({
            file: 'jquery-3.2.1.min.js'
        }, function () {
            chrome.tabs.executeScript({
                file: 'inject.js'
            });
            /*});
            chrome.tabs.executeScript(tab.id, {
                file: "inject.js"
            }, function () {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                }
            });*/
        });
    }
});