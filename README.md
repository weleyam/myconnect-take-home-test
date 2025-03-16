# MyConnect Take-Home Test

## MyConnect.ai Take-Home Test (Weleyam)

### [TASK 1]: End-to-End UI Automation Testing

This project uses **Playwright** to test the login functionality of the **OrangeHRM** website: [OrangeHRM Login](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login). The script includes **positive tests** (successful login and logout) and **negative tests** (invalid login scenarios).

---

### **Test Scenarios**

#### ✅ **Positive Tests:**
- `Login with valid credentials` - Tests login with valid username and password.
- `Logout after successful login` - Tests logout after successful login.

#### ❌ **Negative Tests:**
- `Login with invalid username` - Tests login with an incorrect username.
- `Login with invalid password` - Tests login with an incorrect password.
- `Login with empty username and password` - Tests login with empty inputs.
- `Login with valid username but empty password` - Tests login without a password.
- `Login with valid password but empty username` - Tests login without a username.

---

### **Running the Tests**

#### **1. Install Playwright (if not installed):**
```sh
npm init playwright@latest
```

#### **2. Execute all tests:**
```sh
npx playwright test
```

#### **3. Run specific tests with the `@login` tag:**
```sh
npx playwright test -g "@login"
```

#### **4. Run tests in a visible browser window:**
```sh
npx playwright test --headed
```

#### **5. Run tests on a specific browser (Chromium, Firefox, WebKit):**
```sh
npx playwright test -g "@login" --project chromium --headed
```

#### **6. View test results in Playwright UI:**
```sh
npx playwright show-report
```

---

### [TASK 2]: API Automation Testing

This project uses **Playwright** to automate API testing for authentication endpoints. The test suite covers both **positive** and **negative** scenarios for user login and token validation.

#### **Test Scenarios**

#### ✅ **Positive Tests:**
- `Login with valid credentials` - Ensures a valid user can log in and receives correct response properties.
- `Validate JWT access token` - Confirms that the returned `accessToken` follows JWT format.

#### ❌ **Negative Tests:**
- `Login with incorrect username` - Checks that an invalid username returns a `400` error.
- `Login with incorrect password` - Ensures incorrect passwords return a `400` error.
- `Login with empty username and password` - Tests response when both fields are empty.
- `Login with missing username field` - Ensures missing `username` returns an error.
- `Login with missing password field` - Ensures missing `password` returns an error.

#### **Running the API Tests**

#### **1. Execute all API tests:**
```sh
npx playwright test -g "@api"
```

#### **2. Run only positive API tests:**
```sh
npx playwright test -g "@positive"
```

#### **3. Run only negative API tests:**
```sh
npx playwright test -g "@negative"
```

#### **4. View test results in Playwright UI:**
```sh
npx playwright show-report
```

---

### [TASK 3]: Load and Performance Testing

> _Details to be added_
