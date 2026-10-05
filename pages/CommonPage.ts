import { Page } from "@playwright/test";
import { BasePage } from "./BasePage.ts";
import { HeaderComponent } from "./components/HeaderComponent.ts";

export class CommonPage extends BasePage {
  private headerComponent: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
  }

  getHeaderComponent() {
    return this.headerComponent;
  }
}
