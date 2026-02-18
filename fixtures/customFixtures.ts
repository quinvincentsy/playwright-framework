import { test as base, Page, APIRequestContext, expect } from '@playwright/test';
import { Chance } from 'chance';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
    instructorPage: Page;
    studentPage: Page;
};

const chance = new Chance();

// API helper to create user via automation endpoint
async function createUser(request: APIRequestContext, params: {
    role: string;
    email: string;
    password: string;
    seenTour?: boolean;
    withLicense?: boolean;
}) {
    const response = await request.post('/api/v2/automation/users/create', {
        data: params,
    });
    expect(response.status()).toBe(201);
}

export const test = base.extend<MyFixtures>({
    instructorPage: async ({ browser, request }, use) => {
        const email = chance.email({ length: 20 });
        const password = chance.string({ length: 10 });

        await createUser(request, {
            role: 'instructor',
            email,
            password,
            seenTour: true,
            withLicense: true,
        });

        const context = await browser.newContext({ permissions: ['camera', 'microphone'] });
        const page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.selectRegion('americas');
        await loginPage.login(email, password);

        await use(page);
        await context.close();
    },

    studentPage: async ({ browser, request }, use) => {
        const email = chance.email({ length: 20 });
        const password = chance.string({ length: 10 });

        await createUser(request, {
            role: 'presenter',
            email,
            password,
            seenTour: true,
        });

        const context = await browser.newContext({ permissions: ['camera', 'microphone'] });
        const page = await context.newPage();

        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.selectRegion('americas');
        await loginPage.login(email, password);

        await use(page);
        await context.close();
    },
});
