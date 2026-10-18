import { Locator, Page } from "@playwright/test";
import { TimeOutConstant } from "../constants/timeOutConstant.ts";

export class BasePage {
  //thuộc tính
  protected page: Page;

  //constructor
  constructor(page: Page) {
    this.page = page;
  }

  //phương thức
  //default params
  async inputText(
    locator: Locator,
    text: string,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    await locator.fill(text, {
      timeout: timeOut,
    });
  }

  async clickElement(
    locator: Locator,
    timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT,
  ) {
    // Center the element first so the fixed header/footer of the site never covers it
    await locator.evaluate((el) => el.scrollIntoView({ block: "center" }), undefined, {
      timeout: timeOut,
    });
    await locator.click({
      timeout: timeOut,
    });
  }
}
