import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";
import { TimeOutConstant } from "../../constants/timeOutConstant.ts";

export class HeaderComponent extends BasePage {
  private lnkLogin: Locator;
  private lnkRegister: Locator;

  constructor(page: Page) {
    super(page);
    this.lnkRegister = page.getByRole("link", { name: "Đăng Ký" });
    this.lnkLogin = page.getByRole("link", { name: "Đăng Nhập" });
  }

  async navigateToRegisterPage(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.lnkRegister, timeOut);
  }

  async navigateToLoginPage(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.lnkLogin, timeOut);
  }
}
