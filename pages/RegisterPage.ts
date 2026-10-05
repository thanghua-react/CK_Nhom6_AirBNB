import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage.ts";
import { TimeOutConstant } from "../constants/timeOutConstant.ts";
import { monthShort, parseDateText } from "../utils/dateHelper.ts";

export interface RegisterInfo {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string; // e.g. "December 18, 2000"
  gender: string;
}

export class RegisterPage extends CommonPage {
  private nameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private phoneInput: Locator;
  private birthdayInput: Locator;
  private genderSelect: Locator;
  private registerButton: Locator;
  readonly existingEmailNotice: Locator;

  // antd date picker parts
  private pickerYearButton: Locator;
  private pickerMonthButton: Locator;
  private pickerDecadeButton: Locator;
  private pickerPrevButton: Locator;
  private pickerNextButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.phoneInput = page.locator("#phone");
    this.birthdayInput = page.locator("#birthday");
    this.genderSelect = page.locator("#gender");
    this.registerButton = page.locator("button[type='submit']", { hasText: "Đăng ký" });
    this.existingEmailNotice = page.locator(".ant-message-notice-content", {
      hasText: "Email đã tồn tại !",
    });
    this.pickerYearButton = page.locator("button.ant-picker-year-btn");
    this.pickerMonthButton = page.locator("button.ant-picker-month-btn");
    this.pickerDecadeButton = page.locator("button.ant-picker-decade-btn");
    this.pickerPrevButton = page.locator("button.ant-picker-header-super-prev-btn");
    this.pickerNextButton = page.locator("button.ant-picker-header-super-next-btn");
  }

  async openRegisterForm() {
    const header = this.getHeaderComponent();
    await header.openGuestMenu();
    await header.clickGuestMenuOption("Đăng ký");
  }

  async inputName(name: string, timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.inputText(this.nameInput, name, timeOut);
  }

  async inputEmail(email: string, timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.inputText(this.emailInput, email, timeOut);
  }

  async inputPassword(password: string, timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.inputText(this.passwordInput, password, timeOut);
  }

  async inputPhone(phone: string, timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.inputText(this.phoneInput, phone, timeOut);
  }

  // Types an email and leaves the field so the inline validation is triggered
  async inputEmailAndBlur(email: string) {
    await this.inputEmail(email);
    await this.emailInput.press("Tab");
  }

  async chooseBirthday(birthdayText: string) {
    const date = parseDateText(birthdayText);
    const targetMonth = monthShort(date);

    await this.clickElement(this.birthdayInput);
    await this.pickerYearButton.waitFor();

    const currentYear = (await this.pickerYearButton.innerText()).trim();
    if (currentYear !== String(date.getFullYear())) {
      await this.chooseYear(date.getFullYear());
    }

    // After choosing a year antd shows the month panel (no month button),
    // otherwise the full calendar is still displayed.
    if (await this.pickerMonthButton.isVisible()) {
      const currentMonth = (await this.pickerMonthButton.innerText()).trim().substring(0, 3);
      if (currentMonth !== targetMonth) {
        await this.clickElement(this.pickerMonthButton);
        await this.chooseMonth(targetMonth);
      }
    } else {
      await this.chooseMonth(targetMonth);
    }

    await this.clickElement(
      this.page
        .locator("table.ant-picker-content td.ant-picker-cell-in-view div")
        .getByText(String(date.getDate()), { exact: true }),
    );
  }

  // Opens the year panel and pages through decades until the target year is visible
  private async chooseYear(targetYear: number) {
    await this.clickElement(this.pickerYearButton);
    await this.pickerDecadeButton.waitFor();

    while (true) {
      const [start, end] = (await this.pickerDecadeButton.innerText())
        .split("-")
        .map((value) => Number(value.trim()));

      if (targetYear >= start && targetYear <= end) {
        await this.clickElement(
          this.page
            .locator("tbody td.ant-picker-cell-in-view div")
            .getByText(String(targetYear), { exact: true }),
        );
        return;
      }
      await this.clickElement(targetYear < start ? this.pickerPrevButton : this.pickerNextButton);
    }
  }

  private async chooseMonth(monthShortName: string) {
    await this.clickElement(
      this.page
        .locator("table.ant-picker-content td.ant-picker-cell-in-view div")
        .getByText(monthShortName, { exact: true }),
    );
  }

  async selectGender(gender: string) {
    await this.clickElement(this.genderSelect);
    await this.clickElement(
      this.page.locator("#gender_list + div").locator("div[title]", { hasText: gender }),
    );
  }

  async clickRegisterButton(timeOut: number = TimeOutConstant.TIME_OUT_DEFAULT) {
    await this.clickElement(this.registerButton, timeOut);
  }

  async register(info: RegisterInfo) {
    await this.inputName(info.name);
    await this.inputEmail(info.email);
    await this.inputPassword(info.password);
    await this.inputPhone(info.phone);
    await this.chooseBirthday(info.birthday);
    await this.selectGender(info.gender);
    await this.clickRegisterButton();
  }

  // Inline validation message under a field, e.g. "password" -> #password_help
  getFieldError(field: string): Locator {
    return this.page.locator(`#${field}_help .ant-form-item-explain-error`);
  }
}
