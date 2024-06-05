// This is our service worker, it runs on its own upper level enviroment of the browser, so it can interact with the browser itself and the web pages

//? We will add an event that detects when the target page has loaded
chrome.webNavigation.onDOMContentLoaded.addListener(({ tabId, url }) => {
    // This will be executed once the page has loaded
    console.log("Page has loaded", url)

    //? This will inject a script into the target page. This is almost the same as the content script, but it will run in the context of the web page
    chrome.scripting.executeScript({
        target: { tabId },
        function: () => {
            // This function will be executed in the context of the web page
            // You can interact with the web page DOM as if the script was injected by the page itself
            console.log(
                "Hello from the service worker! This is the injected script!"
            )
        },
    })
})

//? We can also receive messages from the other contexts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // We will check if the message is for us, it must contain a message property with the value "hello-sw"
    if (message.message === "hello-sw") {
        console.log("Message received from popup", message)

        // We can send a response back to the sender
        sendResponse({ message: "Hello from the service worker!" })
    }
})
