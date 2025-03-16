import { test, expect } from '@playwright/test';

const BASE_URL = 'https://dummyjson.com/auth/login';

test.describe('Authentication API Tests @api', () => {

    test('Login with valid credentials @post @positive', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: 'michaelw',
                password: 'michaelwpass'
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('accessToken');
        expect(responseBody).toHaveProperty('refreshToken');
        expect(responseBody.username).toBe('michaelw');

        expect(typeof responseBody.accessToken).toBe('string');
        expect(typeof responseBody.refreshToken).toBe('string');
        expect(typeof responseBody.id).toBe('number');
        expect(typeof responseBody.username).toBe('string');
        expect(typeof responseBody.email).toBe('string');
        expect(typeof responseBody.firstName).toBe('string');
        expect(typeof responseBody.lastName).toBe('string');
        expect(typeof responseBody.gender).toBe('string');
        expect(typeof responseBody.image).toBe('string');
    });


    test('Login with incorrect username @post @negative', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: 'wronguser',
                password: 'michaelwpass'
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Invalid credentials")
    });

    test('Login with incorrect password @post @negative', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: 'michaelw',
                password: 'wrongpass'
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Invalid credentials")
    });


    test('Login with empty username and password @post @negative', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: '',
                password: ''
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Username and password required")
    });

    test('Login with missing username field @post @negative', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                password: 'michaelwpass'
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Username and password required")
    });

    test('Login with missing password field @post @negative', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: 'michaelw'
            }
        });
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Username and password required")
    });

    test('Validate JWT access token @post @positive', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: 'michaelw',
                password: 'michaelwpass'
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.accessToken).toMatch(/^eyJ[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/);
    });
});