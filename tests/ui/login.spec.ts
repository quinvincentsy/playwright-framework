import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import users from '../../fixtures/users.json';

test.describe('GoReact Login - UI', () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        await loginPage.goto();
        await loginPage.selectionRegionUS();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test('should login successfully with valid credentials', async () => {
        await loginPage.login(
            users.validUser.email,
            users.validUser.password
        );

        await dashboardPage.assertUserIsLoggedIn();
    });

    test('should show error for invalid credentials', async () => {
        await loginPage.login(
            users.invalidUser.email,
            users.invalidUser.password
        );

        await loginPage.assertLoginError();
    });
});
