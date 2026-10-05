import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";

export class RoomDetailPage extends CommonPage {
  readonly roomName: Locator;
  readonly roomLocation: Locator;
  readonly roomImage: Locator;
  readonly maxGuests: Locator;
  readonly bookingForm: Locator;
  // Shown instead of the review form when the visitor is not logged in
  readonly loginToReviewAlert: Locator;
  readonly commentsList: Locator;

  constructor(page: Page) {
    super(page);
    this.roomName = page.locator("xpath=//div[contains(@class,'container')]//div[contains(@class,'grid')]/preceding-sibling::h2").first();
    this.roomLocation = page.locator("xpath=//div[contains(@class,'container')]//h2/following-sibling::div//a").first();
    this.roomImage = page.locator("div.ant-image img").first();
    this.maxGuests = page.locator("xpath=//div[contains(@class,'grid')]//h3/following-sibling::p").first();
    this.bookingForm = page
      .locator("button.bg-main", { hasText: "Đặt phòng" })
      .locator("xpath=..");
    this.loginToReviewAlert = page.locator("div[role='alert']", {
      hasText: "Cần đăng nhập để bình luận",
    });
    this.commentsList = page
      .locator("h3", { hasText: "Bình luận" })
      .locator("xpath=following-sibling::div[contains(@class,'grid')]");
  }
}
