import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";
import { parsePrice } from "../utils/dateHelper.ts";

export class RoomsPage extends CommonPage {
  readonly roomCards: Locator;

  constructor(page: Page) {
    super(page);
    this.roomCards = page
      .locator("h1", { hasText: "Chỗ ở tại khu vực" })
      .locator("xpath=following-sibling::div")
      .locator("a");
  }

  // The four pieces of information every room card must show
  getCardImage(card: Locator): Locator {
    return card.locator(".ant-card-body img").first();
  }

  getCardName(card: Locator): Locator {
    return card.locator(".ant-card-body .relative > p").nth(1);
  }

  getCardCapacity(card: Locator): Locator {
    return card.locator("xpath=.//div[contains(@class,'relative')]/following-sibling::p[contains(normalize-space(.),'khách')]");
  }

  getCardPrice(card: Locator): Locator {
    return card.locator("xpath=.//div[contains(text(),' / đêm')]//span").first();
  }

  async getFirstCardHref(): Promise<string> {
    return (await this.roomCards.first().getAttribute("href")) ?? "";
  }

  async getFirstCardPricePerNight(): Promise<number> {
    await this.getCardPrice(this.roomCards.first()).waitFor();
    return parsePrice(await this.getCardPrice(this.roomCards.first()).innerText());
  }

  async openFirstRoom() {
    await this.clickElement(this.roomCards.first());
  }
}
