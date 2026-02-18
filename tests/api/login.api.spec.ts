import { test, expect } from '@playwright/test';
import users from '../../fixtures/users.json';

test.describe('GoReact Login - API', () => {

    test('should login successfully via API', async ({ request }) => {
        const response = await request.post('https://dev.goreact.com/api/v2/users:login', {
            data: {
                username: users.validUser.instructor.email,
                password: users.validUser.instructor.password
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body).toHaveProperty('user');
        expect(body.user.email).toBe(users.validUser.instructor.email);
    });

    test('should fail login with invalid credentials', async ({ request }) => {
        const response = await request.post('https://dev.goreact.com/api/v2/users:login', {
            data: {
                username: users.invalidUser.instructor.email,
                password: users.invalidUser.instructor.password
            }
        });

        expect(response.status()).toBe(400);

        const bodyText = await response.text();
        // Assert error message
        expect(bodyText).toContain('Incorrect username/password combination');
    });
});
