import { Page, expect, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly libraryButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.libraryButton = page.locator('[data-cy="library-button"]');
  }

  async assertUserIsLoggedIn() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
  
}
