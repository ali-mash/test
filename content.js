// Run when Facebook login page is loaded
chrome.storage.local.get(["fb_username", "fb_password"], (data) => {
  const username = data.fb_username;
  const password = data.fb_password;

  const emailInput = document.querySelector('#email');
  const passInput = document.querySelector('#pass');
  const loginBtn = document.querySelector('button[name="login"]');

  if (emailInput && passInput && loginBtn) {
    emailInput.value = username;
    passInput.value = password;
    setTimeout(() => {
      loginBtn.click();
    }, 1000); // Delay to ensure fields are populated
  }
});
