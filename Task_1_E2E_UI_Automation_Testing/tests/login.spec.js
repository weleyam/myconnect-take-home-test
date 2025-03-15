import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPages.js';

test.describe('Login Page @login', () => {

    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.goToLoginPage();
    });
    
    test('Login with valid credentials @positive', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });
    });

    test('Login with invalid username @negative', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('wrongUsername', 'admin123');
        await expect(login.invalidCredentials()).toBeVisible();
    });

    test('Login with invalid password @negative', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin', 'WrongPassword!');
        await expect(login.invalidCredentials()).toBeVisible();
    });

    test('Login with empty username and password @negative', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('', '');
        await expect(login.usernameRequired()).toBeVisible();
        await expect(login.passwordRequired()).toBeVisible();
    });

    test('Login with valid username but empty password @negative', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin', '');
        await expect(login.passwordRequired()).toBeVisible();
    });

    test('Login with valid password but empty username @negative', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('', 'admin123');
        await expect(login.usernameRequired()).toBeVisible();
    });

    test('Logout after successful login @positive', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login('Admin', 'admin123');
        await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

        await login.logout();
        await expect(page).toHaveURL(/login/, { timeout: 10000 });
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });

});
