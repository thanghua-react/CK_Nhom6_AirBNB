import { test, expect } from "../../fixtures/page-fixture.ts";
import { env } from "../../utils/env.ts";

const REQUIRED_MESSAGE = "Vui lòng không bỏ trống";
const INVALID_EMAILS = ["testing06gmail", "abc@", "@gmail.com", "abc@gmail", "abc@gmail..com"];

test.describe("verify register function", () => {
  test.beforeEach(async ({ page, registerPage }) => {
    await page.goto("/");
    await registerPage.openRegisterForm();
  });

  test("TC_01: register fails when the email already exists", async ({ registerPage }) => {
    //step 1: fill the form with an email that is already registered
    await registerPage.register({
      name: env.registerName,
      email: env.registerExistingEmail,
      password: env.registerPassword,
      phone: env.registerPhone,
      birthday: env.registerBirthday,
      gender: env.registerGender,
    });

    //step 2: verify the duplicate email notice is shown
    await expect(registerPage.existingEmailNotice).toBeVisible();
  });

  test("required field messages are shown", async ({ registerPage }) => {
    //step 1: submit the form with empty password and phone
    await registerPage.register({
      name: env.registerName,
      email: env.registerExistingEmail,
      password: "",
      phone: "",
      birthday: env.registerBirthday,
      gender: env.registerGender,
    });

    //step 2: verify the required messages of the empty fields
    await expect(registerPage.getFieldError("password")).toHaveText(REQUIRED_MESSAGE);
    await expect(registerPage.getFieldError("phone")).toHaveText(REQUIRED_MESSAGE);
  });

  for (const email of INVALID_EMAILS) {
    test(`email format message is shown for "${email}"`, async ({ registerPage }) => {
      //step 1: type an invalid email and leave the field
      await registerPage.inputEmailAndBlur(email);

      //step 2: verify the format message is shown
      await expect(registerPage.getFieldError("email")).toContainText(
        "Vui lòng nhập đúng định dạng email",
      );
    });
  }
});
