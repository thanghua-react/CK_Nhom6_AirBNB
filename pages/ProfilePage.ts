import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";

export class ProfilePage extends CommonPage {
  private editProfileButton: Locator;
  private updateButton: Locator;
  private nameInput: Locator;
  private emailInput: Locator;
  private phoneInput: Locator;
  private changeAvatarButton: Locator;
  private fileInput: Locator;
  private uploadAvatarButton: Locator;
  private avatarImage: Locator;
  readonly updateSuccessNotice: Locator;
  readonly uploadSuccessNotice: Locator;
  readonly bookingHistoryTitle: Locator;
  readonly bookingItems: Locator;

  constructor(page: Page) {
    super(page);
    this.bookingHistoryTitle = page.locator("h1", { hasText: "Phòng đã thuê" });
    this.editProfileButton = this.bookingHistoryTitle.locator("xpath=preceding-sibling::button");
    this.updateButton = page.locator(".ant-modal-content button[type='button']", {
      hasText: "Cập nhật",
    });
    // Scoped to the edit modal: the page also contains a hidden login form with an #email input
    this.nameInput = page.locator(".ant-modal-content input#name");
    this.emailInput = page.locator(".ant-modal-content input.ant-input#email");
    this.phoneInput = page.locator(".ant-modal-content input#phone");
    this.changeAvatarButton = page.locator(".ant-card-body button", { hasText: "Cập nhật ảnh" });
    this.fileInput = page.locator("input[type='file']");
    this.uploadAvatarButton = this.fileInput.locator(
      "xpath=following-sibling::button[contains(text(),'Upload Avatar')]",
    );
    this.avatarImage = page.locator(
      "xpath=//button[contains(text(),'Cập nhật ảnh')]/../preceding-sibling::img",
    );
    this.updateSuccessNotice = page.locator(".ant-message-notice-content", {
      hasText: "Cập nhật thông tin thành công",
    });
    // Matched by keyword so the check does not depend on the exact Vietnamese sentence
    this.uploadSuccessNotice = page.locator(".ant-message-notice-content", {
      hasText: /avatar/i,
    });
    this.bookingItems = page.locator("xpath=//div[@class='ant-card-body']/ancestor::a");
  }

  getMessage(text: string): Locator {
    return this.page.locator(".ant-message-notice-content", { hasText: text });
  }

  async openUpdateModal() {
    await this.clickElement(this.editProfileButton);
  }

  async clickUpdateButton() {
    await this.clickElement(this.updateButton);
  }

  async updateName(name: string) {
    await this.inputText(this.nameInput, name);
  }

  async updateEmail(email: string) {
    await this.inputText(this.emailInput, email);
  }

  async updatePhone(phone: string) {
    await this.inputText(this.phoneInput, phone);
  }

  async uploadAvatar(filePath: string) {
    await this.clickElement(this.changeAvatarButton);
    await this.fileInput.setInputFiles(filePath);
    await this.clickElement(this.uploadAvatarButton);
  }

  async getAvatarSrc(): Promise<string> {
    await this.avatarImage.waitFor();
    return (await this.avatarImage.getAttribute("src")) ?? "";
  }
}
