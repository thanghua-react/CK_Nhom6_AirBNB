import { TimeOutConstant } from "../constants/timeOutConstant.ts";
import { CommonPage } from "./CommonPage.ts";
import { Locator, Page } from "@playwright/test";

export class RegisterPage extends CommonPage {
  private accountInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private fullNameInput: Locator;
  private emailInput: Locator;
  private registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.accountInput = page.getByRole("textbox", { name: "Tài Khoản" });
    this.passwordInput = page.getByRole("textbox", {
      name: "Mật Khẩu",
      exact: true,
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Nhập lại mật khẩu",
    });
    this.fullNameInput = page.getByRole("textbox", { name: "Họ Tên" });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.registerButton = page.getByRole("button", { name: "Đăng ký" });
  }

  async inputAccount(
    account: string,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await this.inputText(this.accountInput, account, timeOut);
  }

  async inputPassword(
    password: string,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await this.inputText(this.passwordInput, password, timeOut);
  }

  async inputConfirmPassword(
    confirmPassword: string,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await this.inputText(this.confirmPasswordInput, confirmPassword, timeOut);
  }

  async inputFullName(
    fullName: string,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await this.inputText(this.fullNameInput, fullName, timeOut);
  }

  async inputEmail(
    email: string,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await this.inputText(this.emailInput, email, timeOut);
  }

  async clickRegisterButton(
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await this.clickElement(this.registerButton, timeOut);
  }

  async register(
    account: string,
    password: string,
    fullName: string,
    email: string,
  ) {
    await this.inputAccount(account);
    await this.inputPassword(password);
    await this.inputConfirmPassword(password);
    await this.inputFullName(fullName);
    await this.inputEmail(email);
    await this.clickRegisterButton();
  }
}
