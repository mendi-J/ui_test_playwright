const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const fs = require("fs");

test.describe("Sauce Demo App Automation Task", () => {
  let login;
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  test.beforeAll(async () => {
    const data = JSON.parse(
      fs.readFileSync("user-info/userLogin.json", "utf-8")
    );
    if (!data || !data.login) {
      throw new Error("Failed to load user login data from user-info");
    }
    login = data.login;
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Debugging: Ensure page has loaded
    await page.waitForSelector("#user-name");
    await page.waitForSelector("#password");
    await page.waitForSelector("#login-button");

    await loginPage.enterUsername(page, login.username);
    await loginPage.enterPassword(page, login.password);
    await loginPage.clickLogin(page);
  });

  test("Verify successful login", async ({ page }) => {
    console.log("Attempting to verify login...");
    await expect(page).toHaveURL(/.*inventory/);
    console.log("You have successfully logged in");
  });

  test("Should correctly sort inventory item by name from A to Z", async ({
    page,
  }) => {
    await inventoryPage.validateSortOrderAtoZ(page);
  });

  test("Should correctly sort inventory item by name from Z to A", async ({
    page,
  }) => {
    await inventoryPage.validateSortOrderZtoA(page);
  });
});
