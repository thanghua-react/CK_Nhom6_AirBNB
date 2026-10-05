import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";
import { TimeOutConstant } from "../constants/timeOutConstant.ts";

export class LoginPage extends CommonPage {
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  readonly invalidCredentialsNotice: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("button[type='submit']", { hasText: "Đăng nhập" });
    this.invalidCredentialsNotice = page.locator(".ant-message-notice-content", {
      hasText: "Email hoặc mật khẩu không đúng !",
    });
  }

  async openSignInForm() {
    const header = this.getHeaderComponent();
    await header.openGuestMenu();
    await header.clickGuestMenuOption("Đăng nhập");
  }

  async inputEmail(email: string, timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.inputText(this.emailInput, email, timeOut);
  }

  async inputPassword(password: string, timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.inputText(this.passwordInput, password, timeOut);
  }

  async clickLoginButton(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.loginButton, timeOut);
  }

  async login(email: string, password: string) {
    await this.inputEmail(email);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }
}
