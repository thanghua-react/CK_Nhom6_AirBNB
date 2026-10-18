import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";
import { monthFull, monthShort, parsePrice } from "../utils/dateHelper.ts";

export class BookingPage extends CommonPage {
  private checkInField: Locator;
  private calendarMonthName: Locator;
  private monthDropdown: Locator;
  private yearDropdown: Locator;
  private closeCalendarButton: Locator;
  private plusGuestButton: Locator;
  private bookingButton: Locator;
  private confirmButton: Locator;
  private pricePerNight: Locator;
  readonly guestCount: Locator;
  readonly totalBeforeTaxes: Locator;
  readonly cleaningFee: Locator;
  readonly successNotice: Locator;
  readonly loginRequiredNotice: Locator;
  readonly anyNotice: Locator;

  constructor(page: Page) {
    super(page);
    this.checkInField = page
      .locator("div.font-bold", { hasText: "Nhận phòng" })
      .locator("xpath=parent::div");
    this.calendarMonthName = page.locator("div.rdrMonthName");
    this.monthDropdown = page.locator("span.rdrMonthPicker select");
    this.yearDropdown = page.locator("span.rdrYearPicker select");
    this.closeCalendarButton = page.locator(".ant-modal-title button", { hasText: "Close" });
    const guestRow = page.locator("xpath=//div[text()='Khách']/following-sibling::div");
    // The "+" text is nested in two divs; the innermost one is the clickable button
    this.plusGuestButton = guestRow.locator("div", { hasText: /^\+$/ }).last();
    this.guestCount = guestRow.locator("xpath=div[.='–']/following-sibling::div[text()]");
    this.bookingButton = page.locator("button", { hasText: /^Đặt phòng$/ });
    this.confirmButton = page.locator("xpath=//h5/following::div//button[text()='Xác nhận']");
    this.pricePerNight = page.locator("xpath=//div[contains(@class,'flex-wrap')]//div[contains(text(),'night')]//span");
    this.totalBeforeTaxes = page.locator("xpath=//div//p[contains(text(),'Total before taxes')]/following-sibling::p");
    this.cleaningFee = page.locator("xpath=//p[contains(@class,'underline') and contains(text(),'Cleaning fee')]/following-sibling::p");
    this.successNotice = page.locator(".ant-notification-notice-success", {
      hasText: "Thêm mới thành công!",
    });
    this.loginRequiredNotice = page.locator(".ant-notification-notice-warning", {
      hasText: "Vui lòng đăng nhập để tiếp tục đặt phòng.",
    });
    this.anyNotice = page.locator(".ant-notification-notice");
  }

  async openDatePicker() {
    await this.clickElement(this.checkInField);
  }

  // Picks a day in the react-date-range calendar, switching month/year first if needed
  async chooseDate(date: Date) {
    const displayed = (await this.calendarMonthName.first().innerText()).trim().split(" ");
    const isDisplayed =
      displayed[0] === monthShort(date) && displayed[1] === String(date.getFullYear());

    if (!isDisplayed) {
      await this.yearDropdown.selectOption(String(date.getFullYear()));
      await this.monthDropdown.selectOption(monthFull(date));
    }

    await this.clickElement(
      this.page
        .locator("button.rdrDay:not(.rdrDayPassive)")
        .filter({ has: this.page.getByText(String(date.getDate()), { exact: true }) }),
    );
  }

  async closeDatePicker() {
    await this.clickElement(this.closeCalendarButton);
  }

  async increaseGuestsTo(target: number) {
    let current = Number.parseInt(await this.guestCount.innerText(), 10);
    while (current < target) {
      await this.clickElement(this.plusGuestButton);
      current += 1;
    }
  }

  async clickBookingButton() {
    await this.clickElement(this.bookingButton);
  }

  async clickConfirm() {
    await this.clickElement(this.confirmButton);
  }

  async getPricePerNight(): Promise<number> {
    return parsePrice(await this.pricePerNight.innerText());
  }

  async getCleaningFee(): Promise<number> {
    return parsePrice(await this.cleaningFee.innerText());
  }
}
