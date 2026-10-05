import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";

export class HomePage extends CommonPage {
  private locationField: Locator;
  private searchButton: Locator;
  private hoChiMinhCard: Locator;
  readonly banner: Locator;
  readonly logoutNotice: Locator;

  constructor(page: Page) {
    super(page);
    this.locationField = page
      .locator("p", { hasText: "Địa điểm" })
      .locator("xpath=parent::div[contains(@class,'col-span-3')]");
    this.searchButton = page.locator("span[aria-label='search']").locator("xpath=parent::div");
    this.hoChiMinhCard = page.locator("a[href='/rooms/ho-chi-minh']", {
      has: page.locator("h2", { hasText: "Hồ Chí Minh" }),
    });
    this.banner = page.locator("div[class*='banner-responsive']");
    this.logoutNotice = page.locator(".ant-message-notice-content", {
      hasText: "Đăng xuất thành công",
    });
  }

  async chooseLocation(locationName: string) {
    await this.clickElement(this.locationField);
    await this.clickElement(
      this.page
        .locator("h1", { hasText: "Tìm kiếm địa điểm" })
        .locator("xpath=following-sibling::div")
        .locator("p", { hasText: locationName })
        .locator("xpath=preceding-sibling::div"),
    );
  }

  async clickSearchButton() {
    await this.clickElement(this.searchButton);
  }

  // Opens the room list of Ho Chi Minh from the location cards on the home page
  async openHoChiMinhRooms() {
    await this.clickElement(this.hoChiMinhCard);
  }
}
