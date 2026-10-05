import { test, expect } from "../../fixtures/page-fixture.ts";
import { env } from "../../utils/env.ts";

test.describe("verify login function", () => {
  test("TC_03: login with a valid account", async ({ page, loginPage }) => {
    //step 1: go to home page
    await page.goto("/");

    //step 2: open the sign in form
    await loginPage.openSignInForm();

    //step 3: enter valid credentials
    await loginPage.login(env.loginEmail, env.loginPassword);

    //step 4: verify the user menu (logged in state) is shown
    await expect(loginPage.getHeaderComponent().userMenuButton).toBeVisible();
  });

  test("TC_04: login fails with a wrong email/password", async ({ page, loginPage }) => {
    //step 1: go to home page
    await page.goto("/");

    //step 2: open the sign in form
    await loginPage.openSignInForm();

    //step 3: enter invalid credentials
    await loginPage.login(env.loginInvalidEmail, env.loginInvalidPassword);

    //step 4: verify the error notice is shown and the user stays a guest
    await expect(loginPage.invalidCredentialsNotice).toBeVisible();
    await expect(loginPage.getHeaderComponent().userMenuButton).toBeHidden();
  });
});
