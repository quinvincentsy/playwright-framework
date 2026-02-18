import { expect } from '@playwright/test';
import { test } from '../../fixtures/customFixtures';
import users from '../../fixtures/users.json';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('GoReact Login - Role-based tests', () => {
    // Positive scenarios
    test('log in as instructor using API and verify library is visible', async ({ instructorPage }) => {
        const dashboard = new DashboardPage(instructorPage);
        await dashboard.assertUserIsLoggedIn();
        await expect(dashboard.libraryButton).toBeVisible();
    });

    test('log in as student using API and verify library is not visible', async ({ studentPage }) => {
        const dashboard = new DashboardPage(studentPage);
        await dashboard.assertUserIsLoggedIn();
        await expect(dashboard.libraryButton).not.toBeVisible();
    });

    // Negative scenarios
    test('log in as instructor using invalid credentials and verify error message is displayed', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.selectRegion('americas');

        // Use an invalid email and password from user.json fixture
        await loginPage.login(
            users.invalidUser.instructor.email,
            users.invalidUser.instructor.password
        );
        await loginPage.assertLoginError();
    });

    test('log in as student using invalid credentials and verify error message is displayed', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.selectRegion('americas');

        // Use an invalid email and password from user.json fixture
        await loginPage.login(
            users.invalidUser.student.email,
            users.invalidUser.student.password
        );
        await loginPage.assertLoginError();
    });
});
