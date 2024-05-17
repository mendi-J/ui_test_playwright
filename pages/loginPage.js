class LoginPage {
  async enterUsername(page, username) {
    await page.fill("#user-name", username);
  }

  async enterPassword(page, password) {
    await page.fill("#password", password);
  }

  async clickLogin(page) {
    await page.click("#login-button");
  }
}

module.exports = LoginPage;
