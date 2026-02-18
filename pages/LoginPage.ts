import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly regionSelectorBase: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.regionSelectorBase = page.locator('[data-cy="region-selector-option-');
        this.emailInput = page.locator('[data-cy="login-email-field"]');
        this.passwordInput = page.locator('[data-cy="login-password-field"]');
        this.loginButton = page.locator('[data-cy="login-button"]');
        this.errorMessage = page.locator('.error-message');
    }

    async goto() {
        await this.page.goto('/dashboard/auth/login/');
    }

    async selectRegion(region: string) {
        const regionOption = this.page.locator(`${this.regionSelectorBase}${region}"]`);
        await regionOption.waitFor({ state: 'visible' });
        await regionOption.click();
    }


    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }
}
