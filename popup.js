document.getElementById("searchBtn").addEventListener("click", async () => {
  const author = document.getElementById("author").value.trim();
  const reviewer = document.getElementById("reviewer").value.trim();
  const site = document.getElementById("site").value;

  if (!author || !reviewer) {
    alert("Please enter both names.");
    return;
  }

  const query = `"${author}" AND "${reviewer}"`;

  let url = "";
  if (site === "wos") {
    url = "https://www.webofscience.com/wos/woscc/advanced-search";
  }

  chrome.tabs.create({ url }, function (tab) {
    // Pass query to content script after tab is fully loaded
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === tab.id && info.status === "complete") {
        chrome.tabs.sendMessage(tab.id, { query });
        chrome.tabs.onUpdated.removeListener(listener
      }
    });
  });
});


document.getElementById("loginBtn").addEventListener("click", async () => {
  console.log("Login button clicked"); // <--- this should appear in dev tools

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  chrome.storage.local.set({ fb_username: username, fb_password: password }, () => {
    console.log("Credentials stored");

    chrome.tabs.create({ url: "https://www.facebook.com/login" });
  });
});
