import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";
import { TimeOutConstant } from "../constants/timeOutConstant.ts";

export class LoginPage extends CommonPage {
  private accountInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  constructor(page: Page) {
    super(page);
    this.accountInput = page.getByRole("textbox", { name: "Tài khoản" });
    this.passwordInput = page.getByRole("textbox", { name: "Mật khẩu" });
    this.loginButton = page.getByRole("button", { name: "Đăng nhập" });
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

  async clickLoginButton(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.loginButton, timeOut);
  }

  async login(account: string, password: string) {
    await this.inputAccount(account);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }
}
