// This is our automatically injected content script. It will run in the context of the webpage, so it can interact with the DOM of that web page.

//? DOM Interactions
// This example will get the first H1 element on the page and change its text to "Hello from the content script!"
document.getElementsByTagName("h1")[0].innerText =
    "Hello from the content script!"

//? Receiving messages from other contexts
// On this example, we will add an event to receive incomming messages from the service worker and the popup contexts.
// We will also send a response back to the sender.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check if the message is for us, it must contain a message property with the value "hello-contentjs"
    if (message.message === "hello-contentjs") {
        console.log("Message received from Popup.js: ", message.message)

        // Now we can respond back to the sender
        sendResponse({
            message: "Hello from the content script!",
        })
    }
})
