function listener(tabId, changeInfo, tab) {
  // Check if the page is loaded and matches the Facebook login page
  if (changeInfo.status === "complete" && tab.url === "https://www.facebook.com/login") {
    // Inject the content script into the page to auto-fill the form
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: autoFillLogin
    });

    // Remove the listener after it has triggered once
    chrome.tabs.onUpdated.removeListener(listener);
  }
}

// Add the listener for tab updates
chrome.tabs.onUpdated.addListener(listener);

// Auto-fill the login form and submit it
function autoFillLogin() {
  chrome.storage.local.get(["fb_username", "fb_password"], (data) => {
    const emailInput = document.querySelector('#email');
    const passInput = document.querySelector('#pass');
    const loginBtn = document.querySelector('button[name="login"]');

    if (emailInput && passInput && loginBtn) {
      emailInput.value = data.fb_username || '';
      passInput.value = data.fb_password || '';

      // Click the login button after filling the form
      loginBtn.click();
    }
  });
}
