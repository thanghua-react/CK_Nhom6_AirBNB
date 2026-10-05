import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.ts";
import { LoginPage } from "../pages/LoginPage.ts";
import { RegisterPage } from "../pages/RegisterPage.ts";
import { RoomsPage } from "../pages/RoomsPage.ts";
import { RoomDetailPage } from "../pages/RoomDetailPage.ts";
import { BookingPage } from "../pages/BookingPage.ts";
import { ProfilePage } from "../pages/ProfilePage.ts";
import { env } from "../utils/env.ts";

type MyFixture = {
  homePage: HomePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
  roomsPage: RoomsPage;
  roomDetailPage: RoomDetailPage;
  bookingPage: BookingPage;
  profilePage: ProfilePage;
  // Opens the home page and logs in with the valid account from .env
  loggedInUser: void;
  // add more pages here when needed
};

export const test = base.extend<MyFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  roomsPage: async ({ page }, use) => {
    await use(new RoomsPage(page));
  },

  roomDetailPage: async ({ page }, use) => {
    await use(new RoomDetailPage(page));
  },

  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  loggedInUser: async ({ page, loginPage }, use) => {
    await page.goto("/");
    await loginPage.openSignInForm();
    await loginPage.login(env.loginEmail, env.loginPassword);
    await expect(loginPage.getHeaderComponent().userMenuButton).toBeVisible();
    await use();
  },
});

export { expect };
