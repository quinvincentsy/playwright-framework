import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly regionUS: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.regionUS = page.locator('[data-cy="region-selector-option-americas"]');
        this.emailInput = page.locator('[data-cy="login-email-field"]');
        this.passwordInput = page.locator('[data-cy="login-password-field"]');
        this.loginButton = page.locator('[data-cy="login-button"]');
        this.errorMessage = page.locator('.error-message');
    }

    async goto() {
        await this.page.goto('/dashboard/auth/login/');
    }

    async selectionRegionUS() {
        await expect(this.regionUS).toBeVisible();
        await this.regionUS.click();
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
