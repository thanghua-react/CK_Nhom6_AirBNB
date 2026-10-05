import { LoginPage } from "../../pages/LoginPage.ts";
import { RegisterPage } from "../../pages/RegisterPage.ts";
import { expect } from "@playwright/test";
import { test } from "../../fixtures/page-fixture.ts";

//sử dụng thông tin đã đăng ký để đăng nhập
test.describe.serial("verify login function", () => {
  const account = crypto.randomUUID();
  const password = "Cybersoft@123";
  const fullname = "testing playwright";
  const email = `${account}@gmail.com`;

  test("verify register function", async ({ page, registerPage }) => {
    //step 1: go to https://demo1.cybersoft.edu.vn/
    await page.goto("/");

    //step 2: click "Đăng ký" button
    await registerPage.getHeaderComponent().navigateToRegisterPage();

    //step 3: enter register infomation
    await registerPage.register(account, password, fullname, email);

    //step 4: click "Đăng ký" button
    await registerPage.clickRegisterButton();

    //step 5: verify register success
    const lblSuccess = page.getByRole("heading", {
      name: "Đăng ký thành công",
    });
    await expect(lblSuccess).toBeVisible();
  });

  test("verify login function", async ({ page, loginPage }) => {
    //step 1: go to https://demo1.cybersoft.edu.vn/
    await page.goto("/");

    //step 2: click "Đăng nhập" button
    await loginPage.getHeaderComponent().navigateToLoginPage();

    //step 3: enter login infomation
    await loginPage.login(account, password);

    //step 4: verify login success
    const lblSuccess = page.getByRole("heading", {
      name: "Đăng nhập thành công",
    });
    await expect(lblSuccess).toBeVisible();
  });
});
