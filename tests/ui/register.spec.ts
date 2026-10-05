import { RegisterPage } from "../../pages/RegisterPage.ts";
import { expect } from "@playwright/test";
import { test } from "../../fixtures/page-fixture.ts";
//fixture: page, request, context, browser, browserName, registerPage, loginPage
test("verify register function", async ({ page, registerPage }) => {
  const account = crypto.randomUUID();
  const password = "Cybersoft@123";
  const fullname = "testing playwright";
  const email = `${account}@gmail.com`;

  //step 1: go to https://demo1.cybersoft.edu.vn/
  await page.goto("/");

  //step 2: click "Đăng ký" button
  await registerPage.getHeaderComponent().navigateToRegisterPage();

  //step 3: enter register infomation
  await registerPage.inputAccount(account);

  await registerPage.inputPassword(password);

  await registerPage.inputConfirmPassword(password);

  await registerPage.inputFullName(fullname);

  await registerPage.inputEmail(email);

  //step 4: click "Đăng ký" button
  await registerPage.clickRegisterButton();

  //step 5: verify register success
  const lblSuccess = page.getByRole("heading", { name: "Đăng ký thành công" });
  await expect(lblSuccess).toBeVisible();
});
