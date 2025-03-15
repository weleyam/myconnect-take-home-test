exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsLabel = page.getByText('Invalid credentials');
        this.usernameRequiredLabel = page.locator("//label[text()='Username']/ancestor::div[contains(@class, 'oxd-input-group')]//span[text()='Required']");
        this.passwordRequiredLabel = page.locator("//label[text()='Password']/ancestor::div[contains(@class, 'oxd-input-group')]//span[text()='Required']");
        this.profileDropdown = page.locator("//span[@class='oxd-userdropdown-tab']//p[contains(@class, 'oxd-userdropdown-name')]");
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async goToLoginPage() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async login(username, password) {
        await this.usernameTextbox.fill(username);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

    invalidCredentials() {
        return this.invalidCredentialsLabel;
    }

    usernameRequired() {
        return this.usernameRequiredLabel;
    }

    passwordRequired() {
        return this.passwordRequiredLabel;
    }

    async logout() {
        await this.profileDropdown.click();
        await this.logoutButton.click();
    }
};
