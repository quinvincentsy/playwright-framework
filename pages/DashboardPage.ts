import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertUserIsLoggedIn() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
}
