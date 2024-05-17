const { expect } = require("@playwright/test");

class InventoryPage {
  async validateSortOrderAtoZ(page) {
    await this.validateURL(page);
    await this.selectSortOrder(page, "az");
    await this.logItemNames(page, ".inventory_item_name");
    await this.validateAlphabeticalSortOrder(page);
  }

  async validateSortOrderZtoA(page) {
    await this.selectSortOrder(page, "za");
    await this.logItemNames(page, ".inventory_item_label a");
    await this.validateReverseAlphabeticalSortOrder(page);
  }

  async validateURL(page) {
    const url = page.url();
    expect(url).toContain("inventory");
  }

  async selectSortOrder(page, sortOrder) {
    await page.selectOption(".product_sort_container", sortOrder);
    const value = await page.$eval(".product_sort_container", (el) => el.value);
    expect(value).toBe(sortOrder);
  }

  async logItemNames(page, selector) {
    const items = await page.$$(".inventory_item");
    for (let i = 0; i < items.length; i++) {
      const itemName = await items[i].$eval(selector, (el) =>
        el.textContent.trim()
      );
      console.log(`Item ${i + 1}: ${itemName}`);
    }
  }

  async validateAlphabeticalSortOrder(page) {
    const items = await page.$$(".inventory_item");
    const itemNames = await Promise.all(
      items.map(async (item) => {
        return await item.$eval(".inventory_item_name", (el) =>
          el.textContent.trim()
        );
      })
    );
    for (let i = 0; i < itemNames.length - 1; i++) {
      expect(itemNames[i].localeCompare(itemNames[i + 1])).toBeLessThanOrEqual(
        0
      );
    }
  }

  async validateReverseAlphabeticalSortOrder(page) {
    const items = await page.$$(".inventory_item");
    const itemNames = await Promise.all(
      items.map(async (item) => {
        return await item.$eval(".inventory_item_label a", (el) =>
          el.textContent.trim()
        );
      })
    );
    for (let i = 0; i < itemNames.length - 1; i++) {
      expect(itemNames[i + 1].localeCompare(itemNames[i])).toBeLessThanOrEqual(
        0
      );
    }
  }
}

module.exports = InventoryPage;
