import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage.ts";
import { TimeOutConstant } from "../../constants/timeOutConstant.ts";

export class HeaderComponent extends BasePage {
  // Icon shown when the visitor is not logged in
  readonly guestMenuIcon: Locator;
  // Avatar button shown when the user is logged in
  readonly userMenuButton: Locator;
  private guestMenuOptions: Locator;
  private userMenuPanel: Locator;

  constructor(page: Page) {
    super(page);
    this.guestMenuIcon = page.locator("img[class='h-10']");
    this.userMenuButton = page.locator("#user-menu-button");
    this.guestMenuOptions = page.locator("ul[aria-labelledby='user-menu-button']");
    this.userMenuPanel = this.userMenuButton.locator("xpath=following-sibling::div");
  }

  async openGuestMenu(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.guestMenuIcon, timeOut);
  }

  async openUserMenu(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.userMenuButton, timeOut);
  }

  async clickGuestMenuOption(optionText: string) {
    await this.clickElement(
      this.guestMenuOptions.locator("button", { hasText: optionText }),
    );
  }

  async clickUserMenuOption(optionText: string) {
    await this.clickElement(this.userMenuPanel.locator("a", { hasText: optionText }));
  }

  async logout() {
    await this.clickElement(this.userMenuPanel.locator("button", { hasText: "Sign out" }));
  }
}
