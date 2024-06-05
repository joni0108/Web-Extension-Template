// On this file you can write your custom javascript functions and interact with the 'popup.html' DOM elements
document.getElementsByTagName("body")[0].style.backgroundColor = "red"

//? Sending Messages between contexts
// This will send a message to the service worker and make an alert with the response
chrome.runtime.sendMessage({ message: "hello-sw" }, (response) => {
    alert(response.message)
})

// This will send a message to the content script and make an alert with the response
document
    .getElementById("send-content-message")
    .addEventListener("click", () => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { message: "hello-contentjs" },
                    function (response) {
                        alert(response.message)
                    }
                )
            }
        )
    })
